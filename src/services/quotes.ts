import axios from "axios";
import {
  newsletterBaseUrl,
  QuoteType,
  scrapeClickToTweetRefs,
  scrapeQuote,
} from "jcscraper";
import { MongoClient } from "mongodb";
import { QuoteRepository } from "../repositories/quotes";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const quoteRepository = new QuoteRepository(
  new MongoClient(process.env.MONGODB_URI ?? "")
);

class QuoteService {
  constructor(private quoteRepository: QuoteRepository) {}

  create(quote: QuoteType): Promise<string> {
    return this.quoteRepository.create(quote);
  }

  getById(id: string): Promise<QuoteType | null> {
    return this.quoteRepository.getById(id);
  }

  getRandom(): Promise<QuoteType> {
    return this.quoteRepository.getRandom();
  }

  async scrapeMissingQuotes() {
    const THURSDAY = 4;
    const lastQuote = await this.quoteRepository.getLastOne();
    if (!lastQuote) {
      return null;
    }
    const today = new Date();
    const date = new Date(lastQuote.source.replace(/.*\//g, ""));
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    while (date < today) {
      date.setUTCDate(date.getUTCDate() + 1);
      if (date.getUTCDay() === THURSDAY) {
        // do it sequentially to avoid overloading James Clear server with
        // multiple requests in case que have many missing dates to fill in
        await this.scrapeQuotes(date);
      }
    }
  }

  private async scrapeQuotes(date: Date) {
    const url = new URL(QuoteService.formatDate(date), newsletterBaseUrl).href;
    try {
      console.log(`Getting clickToTweetIds for '${url}' ...`);
      const clickToTweetRefs = await scrapeClickToTweetRefs(url);
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

          return await this.create(quote);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            return err.response?.data;
          }

          throw err;
        }
      });

      const postedQuotes = await Promise.all(promises);
      console.dir(`Inserted ${postedQuotes.length} new quotes:`, postedQuotes);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
      }
    }
  }

  static formatDate(date: Date): string {
    const parts = dateFormatter.formatToParts(date);
    const day = parts.find((part) => part.type === "day")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const year = parts.find((part) => part.type === "year")?.value;

    return `${month}-${day}-${year}`.toLowerCase();
  }
}

export const quoteService = new QuoteService(quoteRepository);
