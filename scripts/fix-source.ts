import * as dotenv from "dotenv";
import type { Quote } from "jcscraper";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.development.local") });

import { quoteRepository } from "../src/repositories/quotes";

const BATCH_SIZE = 50;
async function main() {
  const docs = await quoteRepository.find({ source: { $not: /\/3-2-1\// } });

  const batch: Quote[] = [];
  for (const doc of docs) {
    batch.push(doc);
    if (batch.length >= BATCH_SIZE) {
      console.log(`processing ${batch.length} docs...`);
      await processBatch(batch);
      batch.length = 0;
    }
  }

  if (batch.length > 0) {
    console.log(`processing ${batch.length} docs...`);
    await processBatch(batch);
  }

  console.log("done!");
  process.exit();
}

function processBatch(batch: Quote[]) {
  return Promise.all(
    batch.map((doc) =>
      quoteRepository.update(
        { clickToTweetId: doc.clickToTweetId },
        {
          $set: { source: fixSource(doc.source) },
        }
      )
    )
  );
}

function fixSource(wrongSource: string) {
  return wrongSource.replace("https://jamesclear.com/", (m) => `${m}3-2-1/`);
}

main();
