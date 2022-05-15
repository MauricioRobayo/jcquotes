import dotenv from "dotenv";
import { getQuotes } from "jcscraper";
import { Quote } from "jcscraper/dist/getQuotes";
import { MongoBulkWriteError, MongoClient } from "mongodb";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env.local"),
});

const mongodbUri = process.env.MONGODB_URI ?? "";

const client = new MongoClient(mongodbUri);

async function seed(): Promise<void> {
  const quotes = await getQuotes();

  await client.connect();
  const collection = client.db("jc-quotes").collection<Quote>("quotes");
  collection.createIndex("clickToTweetId", { unique: true });

  try {
    const result = await collection.insertMany(quotes);
    console.log(`Done! Inserted ${result.insertedCount} quotes.`);
    client.close();
  } catch (err) {
    client.close();
    if (err instanceof MongoBulkWriteError) {
      console.log(err.message);
      return;
    }

    throw err;
  }
}

seed();
