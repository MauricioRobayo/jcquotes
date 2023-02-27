import type { QuoteType } from "jcscraper";
import {
  Collection,
  Filter,
  FindOptions,
  MongoClient,
  UpdateFilter,
} from "mongodb";

const defaultProjection = { _id: 0 };

export class QuoteRepository {
  private readonly collection: Collection<QuoteType>;
  constructor(private readonly client: MongoClient) {
    this.collection = this.client
      .db("jc-quotes")
      .collection<QuoteType>("quotes");
  }

  update(filter: Filter<QuoteType>, update: UpdateFilter<QuoteType>) {
    return this.collection.updateOne(filter, update);
  }

  find(filter: Filter<QuoteType>, options?: FindOptions) {
    return this.collection.find(filter, options).toArray();
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

  getLatest(): Promise<QuoteType | null> {
    return this.collection.findOne(
      {},
      { sort: [["_id", "desc"]], projection: defaultProjection }
    );
  }

  getCount() {
    return this.collection.countDocuments();
  }
}

export const quoteRepository = new QuoteRepository(
  new MongoClient(process.env.MONGODB_URI ?? "")
);
