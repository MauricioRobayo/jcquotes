import { MongoClient } from "mongodb";
import { z } from "zod";
import {
  QuoteApiResponse,
  QuoteDto,
  QuoteRepository,
} from "../repositories/quotes";

const mongodbUri = process.env.MONGODB_URI ?? "";

const client = new MongoClient(mongodbUri);
const quoteRepository = new QuoteRepository(client);
const Quote = z.object({
  rawText: z.string(),
  text: z.string(),
  source: z.string(),
  id: z.string(),
});

class QuoteService {
  constructor(private quoteRepository: QuoteRepository) {}

  create(quote: QuoteDto): Promise<string> {
    const validQuote = Quote.parse(quote);
    return this.quoteRepository.create(validQuote);
  }

  getById(id: string): Promise<QuoteApiResponse> {
    return this.quoteRepository.getById(id);
  }

  getRandom(): Promise<QuoteApiResponse> {
    return this.quoteRepository.getRandom();
  }
}

export const quoteService = new QuoteService(quoteRepository);
