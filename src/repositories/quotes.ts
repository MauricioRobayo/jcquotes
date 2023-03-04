import type { Quote } from "jcscraper";
import {
  Collection,
  Filter,
  FindOptions,
  MongoClient,
  UpdateFilter,
} from "mongodb";

const defaultProjection = { _id: 0 };

export class QuoteRepository {
  private readonly collection: Collection<Quote>;
  constructor(private readonly client: MongoClient) {
    this.collection = this.client.db("jc-quotes").collection<Quote>("quotes");
  }

  update(filter: Filter<Quote>, update: UpdateFilter<Quote>) {
    return this.collection.updateOne(filter, update);
  }

  find(filter: Filter<Quote>, options?: FindOptions) {
    return this.collection.find(filter, options).toArray();
  }

  async create(quote: Quote): Promise<string> {
    await this.collection.insertOne(quote);
    return quote.clickToTweetId;
  }

  async getRandom(): Promise<Quote> {
    const [randomQuote] = await this.collection
      .aggregate<Quote>([
        { $sample: { size: 1 } },
        {
          $project: defaultProjection,
        },
      ])
      .toArray();
    return randomQuote;
  }

  async getById(id: string): Promise<Quote | null> {
    return this.collection.findOne(
      { clickToTweetId: id },
      { projection: defaultProjection }
    );
  }

  getLatest(): Promise<Quote | null> {
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
