import { MongoError } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError, z, ZodError } from "zod";
import { quoteService } from "../../../services/quotes";

interface ErrorResponse {
  status: 400 | 401 | 404 | 409 | 500;
  message: string | typeToFlattenedError<any | string>;
}

interface CreatedResponse {
  status: 201;
  id: string;
}

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
    const newQuoteId = await quoteService.create(req.body);
    res.json({
      status: 201,
      id: newQuoteId,
    });
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(401).json({
        status: 400,
        message: err.flatten(),
      });
      return;
    }

    if (err instanceof MongoError) {
      if (err.code === 11000) {
        res.json({
          status: 409,
          message: `Quote id '${req.body.id}' already exists. Cannot duplicated it.`,
        });
        return;
      }
    }

    console.log(JSON.stringify(err, null, 2));
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
    return;
  }
}
