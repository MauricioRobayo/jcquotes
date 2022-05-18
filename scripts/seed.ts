import dotenv from "dotenv";
import { getQuotes } from "jcscraper";
import { Quote } from "jcscraper/dist/getQuotes";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env.local"),
});

async function seed(): Promise<void> {
  const quotes = await getQuotes();

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
