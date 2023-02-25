import { QuoteType } from "jcscraper";
import { NextApiRequest, NextApiResponse } from "next";
import { late } from "zod";
import { quoteService } from "../../../services/quotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteType>
) {
  const latestQuote = await quoteService.getLatest();
  if (!latestQuote) {
    res.status(404).end();
    return;
  }

  res.json(latestQuote);
}
