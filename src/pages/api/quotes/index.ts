import { MongoError } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError, ZodIssue } from "zod";
import { quoteService } from "../../../services/quotes";

const Quote = z.object({
  rawText: z.string(),
  text: z.string(),
  source: z.string(),
  clickToTweetId: z.string(),
});

interface ErrorResponse {
  message: string | ZodIssue[];
}

interface CreatedResponse {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  const apiKey = req.query.key;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const quote = Quote.parse(req.body);
    const newQuoteId = await quoteService.create(quote);
    res.status(201).json({
      id: newQuoteId,
    });
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: err.issues,
      });
      return;
    }

    if (err instanceof MongoError && err.code === 11000) {
      res.status(409).json({
        message: `Quote id '${req.body.clickToTweetId}' already exists. Cannot duplicate it.`,
      });
      return;
    }

    console.log(JSON.stringify(err, null, 2));
    res.status(500).json({
      message: "Something unexpected went wrong!",
    });
    return;
  }
}
