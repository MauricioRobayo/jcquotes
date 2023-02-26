import { NextApiRequest, NextApiResponse } from "next";
import { quoteService, Status } from "../../../services/quotes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status | { message: string }>
) {
  if (req.method !== "GET") {
    res.status(404).send({ message: "Not found" });
    return;
  }

  const status = await quoteService.getStatus();
  res.json(status);
}
