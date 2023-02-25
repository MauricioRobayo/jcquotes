import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.development.local") });

import { quoteService } from "../src/services/quotes";

quoteService.scrapeNewQuotes().then(() => {
  console.log("done!");
  process.exit();
});
