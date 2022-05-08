import { MongoClient } from "mongodb";
import { QuoteDto, QuoteRepository } from "../repositories/quotes";

const mongodbUri = process.env.MONGODB_URI ?? "";

const client = new MongoClient(mongodbUri);
const quoteRepository = new QuoteRepository(client);

class QuoteService {
  constructor(private quoteRepository: QuoteRepository) {}

  create(quote: QuoteDto): Promise<string> {
    return this.quoteRepository.create(quote);
  }

  getById(id: string): Promise<QuoteDto> {
    return this.quoteRepository.getById(id);
  }

  getRandom(): Promise<QuoteDto> {
    return this.quoteRepository.getRandom();
  }
}

export const quoteService = new QuoteService(quoteRepository);
