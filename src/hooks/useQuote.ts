import axios from "axios";
import { quoteSchema } from "jcscraper/dist/schema";
import { useQuery } from "react-query";
import { quoteKeys } from "./quote-keys";

export function useQuote(id: string) {
  const fetchQuote = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${id}`
    );
    return quoteSchema.parse(data);
  };
  return useQuery(quoteKeys.details(id), fetchQuote, {
    enabled: id !== "",
  });
}
