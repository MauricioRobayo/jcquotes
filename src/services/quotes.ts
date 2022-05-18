import { QuoteType } from "jcscraper";
import { MongoClient } from "mongodb";
import { QuoteRepository } from "../repositories/quotes";

const mongodbUri = process.env.MONGODB_URI ?? "";

const client = new MongoClient(mongodbUri);
const quoteRepository = new QuoteRepository(client);

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
}

export const quoteService = new QuoteService(quoteRepository);
