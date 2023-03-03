import axios from "axios";
import { quoteSchema } from "jcscraper/dist/schema";
import { useQuery } from "react-query";

export function useQuote(id: string) {
  const fetchQuote = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${id}`
    );
    return quoteSchema.parse(data);
  };
  return useQuery(["quote", "detail", id], fetchQuote, {
    enabled: Boolean(id),
  });
}
