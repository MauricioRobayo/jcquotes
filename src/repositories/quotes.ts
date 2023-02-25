import type { QuoteType } from "jcscraper";
import { MongoClient } from "mongodb";

const defaultProjection = { _id: 0 };

export class QuoteRepository {
  constructor(private client: MongoClient) {}

  async create(quote: QuoteType): Promise<string> {
    const collection = await this.getCollection();
    await collection.insertOne(quote);
    return quote.clickToTweetId;
  }

  async getRandom(): Promise<QuoteType> {
    const collection = await this.getCollection();
    const [randomQuote] = await collection
      .aggregate<QuoteType>([
        { $sample: { size: 1 } },
        {
          $project: defaultProjection,
        },
      ])
      .toArray();
    return randomQuote;
  }

  async getById(id: string): Promise<QuoteType | null> {
    const collection = await this.getCollection();
    return collection.findOne(
      { clickToTweetId: id },
      { projection: defaultProjection }
    );
  }

  async getLastOne(): Promise<QuoteType | null> {
    const collection = await this.getCollection();
    return collection.findOne(
      {},
      { sort: [["_id", "desc"]], projection: defaultProjection }
    );
  }

  private async getCollection() {
    await this.client.connect();
    return this.client.db("jc-quotes").collection<QuoteType>("quotes");
  }
}
