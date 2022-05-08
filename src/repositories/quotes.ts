import { MongoClient } from "mongodb";

export interface QuoteDto {
  id: string;
  text: string;
  source: string;
}

type QuoteStorage = Pick<QuoteDto, "text" | "source"> & {
  clickToTweetId: string;
};

export class QuoteRepository {
  constructor(private client: MongoClient) {}

  async create(quote: QuoteDto): Promise<string> {
    const collection = await this.getCollection();
    const newQuote = await collection.insertOne({
      ...quote,
      clickToTweetId: quote.id,
    });
    return newQuote.insertedId.toString();
  }

  async getRandom(): Promise<QuoteDto> {
    const collection = await this.getCollection();
    const [randomQuote] = await collection
      .aggregate<QuoteDto>([
        { $sample: { size: 1 } },
        { $project: { _id: 0, id: "$clickToTweetId", text: 1, source: 1 } },
      ])
      .toArray();
    return randomQuote;
  }

  async getById(id: string): Promise<QuoteDto> {
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
