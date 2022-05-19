import dotenv from "dotenv";
import axios from "axios";
import {
  scrapeClickToTweetRefs,
  scrapeQuote,
  newsletterBaseUrl,
} from "jcscraper";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env.local"),
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: Date): string {
  const parts = dateFormatter.formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return `${month}-${day}-${year}`.toLowerCase();
}

export function getPreviousThursday(date = new Date()): Date {
  const currentDate = new Date(date);
  const THURSDAY = 4;

  while (currentDate.getUTCDay() !== THURSDAY) {
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
  }

  return currentDate;
}

async function main() {
  const previousThursday = getPreviousThursday();
  const newsletterUrl = new URL(
    formatDate(previousThursday),
    newsletterBaseUrl
  );
  try {
    console.log(`Getting clickToTweetIds for '${newsletterUrl}' ...`);
    const clickToTweetRefs = await scrapeClickToTweetRefs(newsletterUrl.href);
    console.log(`Found ${clickToTweetRefs.length} clickToTweetRefs.`);
    console.log(`Getting quotes...`);
    const promises = clickToTweetRefs.map(async (clickToTweetRef) => {
      try {
        const quote = await scrapeQuote(clickToTweetRef);

        if ("error" in quote) {
          console.log(
            `Could not get quote for clickToTweetId '${clickToTweetRef.id}'. ${quote.error}`
          );
          return;
        }

        const { data } = await axios.post<{ id: string }>(
          `${process.env.API_URL}?key=${process.env.API_KEY}`,
          quote
        );
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return err.response?.data;
        }

        throw err;
      }
    });

    const postedQuotes = await Promise.all(promises);
    console.dir(postedQuotes);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.message);
    }
  }
}

if (require.main === module) {
  main();
}
