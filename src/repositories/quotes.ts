import { MongoClient } from "mongodb";

export interface QuoteDto {
  id: string;
  text: string;
  rawText: string;
  source: string;
}

export type QuoteApiResponse = Omit<QuoteDto, "rawText">;

export type QuoteStorage = Pick<QuoteDto, "rawText" | "text" | "source"> & {
  clickToTweetId: string;
};

export class QuoteRepository {
  constructor(private client: MongoClient) {}

  async create(quote: Required<QuoteDto>): Promise<string> {
    const collection = await this.getCollection();
    await collection.insertOne({
      text: quote.text,
      rawText: quote.rawText,
      source: quote.source,
      clickToTweetId: quote.id,
    });
    return quote.id;
  }

  async getRandom(): Promise<QuoteApiResponse> {
    const collection = await this.getCollection();
    const [randomQuote] = await collection
      .aggregate<QuoteDto>([
        { $sample: { size: 1 } },
        { $project: { _id: 0, id: "$clickToTweetId", text: 1, source: 1 } },
      ])
      .toArray();
    return randomQuote;
  }

  async getById(id: string): Promise<QuoteApiResponse> {
    const collection = await this.getCollection();
    const [quote] = await collection
      .aggregate<QuoteDto>([
        { $match: { clickToTweetId: id } },
        { $project: { _id: 0, id: "$clickToTweetId", text: 1, source: 1 } },
      ])
      .toArray();
    return quote;
  }

  private async getCollection() {
    await this.client.connect();
    return this.client.db("jc-quotes").collection<QuoteStorage>("quotes");
  }
}
