import type { QuoteType } from "jcscraper";
import { Collection, MongoClient } from "mongodb";

const defaultProjection = { _id: 0 };

export class QuoteRepository {
  private readonly client: MongoClient;
  private readonly collection: Collection<QuoteType>;
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI ?? "");
    this.collection = this.client
      .db("jc-quotes")
      .collection<QuoteType>("quotes");
  }

  async create(quote: QuoteType): Promise<string> {
    await this.collection.insertOne(quote);
    return quote.clickToTweetId;
  }

  async getRandom(): Promise<QuoteType> {
    const [randomQuote] = await this.collection
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
    return this.collection.findOne(
      { clickToTweetId: id },
      { projection: defaultProjection }
    );
  }

  async getLastOne(): Promise<QuoteType | null> {
    return this.collection.findOne(
      {},
      { sort: [["_id", "desc"]], projection: defaultProjection }
    );
  }
}
