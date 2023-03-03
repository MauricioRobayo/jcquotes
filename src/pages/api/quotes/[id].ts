import type { Quote } from "jcscraper";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { quoteService } from "../../../services/quotes";
import NextCors from "nextjs-cors";

const Query = z.object({
  id: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quote | { message: string }>
) {
  await NextCors(req, res, { methods: "GET" });

  try {
    const { id } = Query.parse(req.query);
    const quote = await quoteService.getById(id);
    if (quote === null) {
      res.status(404).send({ message: "Not found" });
      return;
    }

    res.json(quote);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: "Something unexpected happened!" });
  }
}
