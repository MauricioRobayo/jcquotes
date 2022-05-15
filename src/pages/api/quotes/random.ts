import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError } from "zod";
import { QuoteApiResponse } from "../../../repositories/quotes";
import { quoteService } from "../../../services/quotes";

interface ErrorResponse {
  status: 400 | 404;
  message: string | typeToFlattenedError<any | string>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteApiResponse | ErrorResponse>
) {
  const randomQuote = await quoteService.getRandom();
  res.json(randomQuote);
}
