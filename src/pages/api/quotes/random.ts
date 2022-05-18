import type { QuoteType } from "jcscraper";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { quoteService } from "../../../services/quotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteType | { message: string }>
) {
  await NextCors(req, res, { methods: "GET" });

  try {
    const randomQuote = await quoteService.getRandom();
    res.json(randomQuote);
  } catch (err) {
    res.status(500).json({ message: "Unexpected error!" });
  }
}
