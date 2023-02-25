import { NextApiRequest, NextApiResponse } from "next";
import { quoteService } from "../../../services/quotes";

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

  void quoteService.scrapeMissingQuotes();
  res.status(201).json({ message: "Job created." });
}
