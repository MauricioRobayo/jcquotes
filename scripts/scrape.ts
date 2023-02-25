import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.development.local") });

import { quoteService } from "../src/services/quotes";

// this was supposed to be done by the fire-and-forget
// /quotes/cron endpoint but Vercel does not support the
// fire-and-forget pattern and the max execution time is
// 10s which more often than not is not enough causing a
// timeout on the endpoint.
quoteService.scrapeNewQuotes().then(() => {
  console.log("done!");
  process.exit();
});
