import axios from "axios";
import dotenv from "dotenv";
import { getQuotes, Quote } from "jcscraper";
import { MongoClient } from "mongodb";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env.local"),
});

const mongoClient = new MongoClient(process.env.MONGODB_URI ?? "");
async function seed(): Promise<void> {
  await mongoClient.connect();
  await mongoClient
    .db("jc-quotes")
    .collection("quotes")
    .createIndex({ clickToTweetId: 1 }, { unique: true });
  mongoClient.close();

  const quotes = await getQuotes();

  const chunk: Quote[] = [];
  const chunkSize = 20;
  for (const quote of quotes) {
    chunk.push(quote);
    if (chunk.length >= chunkSize) {
      console.log(`Posting ${chunk.length} quotes...`);
      await Promise.all(chunk.map(postQuote));
      chunk.length = 0;
    }
  }

  if (chunk.length > 0) {
    console.log(`Posting ${chunk.length} quotes...`);
    await Promise.all(chunk.map(postQuote));
  }
}

async function postQuote(quote: QuoteType) {
  try {
    const { data } = await axios.post<{ id: string }>(
      `${process.env.API_URL}?key=${process.env.API_KEY}`,
      quote
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 409) {
      console.log(`Quote id ${quote.clickToTweetId} already in database!`);
      return { error: err.code };
    }
  }
}

seed();
