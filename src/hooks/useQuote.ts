import axios from "axios";
import type { QuoteType } from "jcscraper";
import { useQuery } from "react-query";

export function useQuote(id: string) {
  const fetchQuote = async () => {
    const { data } = await axios.get<QuoteType>(
      `${process.env.NEXT_PUBLIC_API_URL}/${id}`
    );
    return data;
  };

  return useQuery(["quote", id], fetchQuote, {
    staleTime: Infinity,
    enabled: Boolean(id),
  });
}
