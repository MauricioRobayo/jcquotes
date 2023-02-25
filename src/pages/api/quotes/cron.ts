import { NextApiRequest, NextApiResponse } from "next";
import { quoteService } from "../../../services/quotes";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  const apiKey = req.headers.authorization?.split(" ")[1];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // The fire-and-forget pattern is not supported by Vercel
  // functions. But if we await for it the execution time limit
  // is just 10s, so more often than not this is going to timeout
  // if awaited. Doing this via script.
  void quoteService.scrapeNewQuotes();
  res.status(201);
}
