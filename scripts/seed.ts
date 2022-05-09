import dotenv from "dotenv";
import { getQuotes } from "jcscraper";
import { Quote } from "jcscraper/dist/getQuotes";
import { MongoClient } from "mongodb";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env.local"),
});

const mongodbUri = process.env.MONGODB_URI ?? "";

console.log(mongodbUri);

const client = new MongoClient(mongodbUri);

async function seed() {
  const quotes = await getQuotes();

  await client.connect();
  await client.db("jc-quotes").collection<Quote>("quotes").insertMany(quotes);

  console.log("Done!");
}

seed();
