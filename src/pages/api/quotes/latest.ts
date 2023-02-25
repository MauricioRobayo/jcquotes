import { NextApiRequest, NextApiResponse } from "next";
import { quoteService } from "../../../services/quotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  quoteService.
}
