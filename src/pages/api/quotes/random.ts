import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError, z, ZodError } from "zod";
import { QuoteDto } from "../../../repositories/quotes";
import { quoteService } from "../../../services/quotes";

interface ErrorResponse {
  status: 400 | 404;
  message: string | typeToFlattenedError<any | string>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteDto | ErrorResponse>
) {
  const randomQuote = await quoteService.getRandom();
  res.json(randomQuote);
}
