import { QuoteType } from "jcscraper";
import { NextApiRequest, NextApiResponse } from "next";
import { quoteService } from "../../../services/quotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteType | { message: string }>
) {
  if (req.method !== "GET") {
    res.status(404).send({ message: "Not found" });
    return;
  }

  const latestQuote = await quoteService.getLatest();
  if (!latestQuote) {
    res.status(404).send({ message: "Not found" });
    return;
  }

  res.json(latestQuote);
}
