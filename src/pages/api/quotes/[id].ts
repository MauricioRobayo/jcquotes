import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError } from "zod";
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
  const { id } = req.query;
  const quote = await quoteService.getById(id as string);
  res.json(quote);
}
