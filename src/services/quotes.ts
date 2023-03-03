import {
  newsletterBaseUrl,
  Quote,
  scrapeClickToTweetRefs,
  scrapeQuote,
} from "jcscraper";
import { QuoteRepository, quoteRepository } from "../repositories/quotes";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
export interface Status {
  latestQuote: Quote | null;
  totalQuotes: number;
}
class QuoteService {
  constructor(private quoteRepository: QuoteRepository) {}

  async getStatus(): Promise<Status> {
    const [latestQuote, quotesCount] = await Promise.all([
      this.quoteRepository.getLatest(),
      this.quoteRepository.getCount(),
    ]);
    return {
      totalQuotes: quotesCount,
      latestQuote,
    };
  }

  create(quote: Quote): Promise<string> {
    return this.quoteRepository.create(quote);
  }

  getById(id: string): Promise<Quote | null> {
    return this.quoteRepository.getById(id);
  }

  getRandom(): Promise<Quote> {
    return this.quoteRepository.getRandom();
  }

  async scrapeNewQuotes() {
    const THURSDAY = 4;
    const lastQuote = await this.quoteRepository.getLatest();
    if (!lastQuote) {
      return null;
    }
    console.log("lastQuote:", JSON.stringify(lastQuote, null, 0));
    const today = new Date();
    const date = new Date(lastQuote.source.replace(/.*\//g, ""));
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    while (date < today) {
      date.setUTCDate(date.getUTCDate() + 1);
      if (date.getUTCDay() === THURSDAY) {
        console.log("starting process for quotes from", date.toISOString());
        // do it sequentially to avoid overloading James Clear server with
        // multiple requests in case que have many missing dates to fill in
        await this.scrapeQuotes(date);
      }
    }
  }

  private async scrapeQuotes(date: Date): Promise<void> {
    const baseUrl = newsletterBaseUrl.replace(/\/+$/, "");
    const url = `${baseUrl}/${QuoteService.formatDate(date)}`;
    console.log(`Getting clickToTweetIds for '${url}' ...`);
    const clickToTweetRefs = await scrapeClickToTweetRefs(url);
    console.log(`Found ${clickToTweetRefs.length} clickToTweetRefs.`);
    console.log(`Getting quotes...`);
    const promises = clickToTweetRefs.map(async (clickToTweetRef) => {
      const quote = await scrapeQuote(clickToTweetRef);

      if ("error" in quote) {
        console.log(
          `Could not get quote for clickToTweetId '${clickToTweetRef.id}'. ${quote.error}`
        );
        return;
      }

      return await this.create(quote);
    });

    const postedQuotes = await Promise.all(promises);
    console.log(
      `Inserted ${postedQuotes.length} new quotes:`,
      JSON.stringify(postedQuotes, null, 2)
    );
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
