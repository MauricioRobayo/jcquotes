import { MongoError } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError, z, ZodError } from "zod";
import { quoteService } from "../../../services/quotes";

interface ErrorResponse {
  message: string | typeToFlattenedError<any | string>;
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
  }

  const apiKey = req.query.key;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const newQuoteId = await quoteService.create(req.body);
    res.status(201).json({
      id: newQuoteId,
    });
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: err.flatten(),
      });
      return;
    }

    if (err instanceof MongoError && err.code === 11000) {
      res.status(409).json({
        message: `Quote id '${req.body.id}' already exists. Cannot duplicate it.`,
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
