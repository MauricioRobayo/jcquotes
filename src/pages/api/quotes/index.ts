import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError, z, ZodError } from "zod";
import { quoteService } from "../../../services/quotes";

interface ErrorResponse {
  status: 400 | 401 | 404;
  message: string | typeToFlattenedError<any | string>;
}

interface CreatedResponse {
  status: 201;
  id: string;
}

const Quote = z.object({
  text: z.string(),
  source: z.string(),
  id: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.status(404).json({ status: 404, message: "Not Found" });
  }

  const apiKey = req.query.key;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
    return;
  }

  try {
    const quote = Quote.parse(req.body);
    const newQuoteId = await quoteService.create(quote);
    return res.json({
      status: 201,
      id: newQuoteId,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(401).json({
        status: 400,
        message: e.flatten(),
      });
    }
    throw e;
  }
}
