import axios from "axios";
import { quoteSchema } from "jcscraper/dist/schema";
import { useQuery } from "@tanstack/react-query";
import { quoteKeys } from "./quote-keys";

export function useQuote(id: string) {
  return useQuery({
    queryKey: quoteKeys.details(id),
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/${id}`
      );
      return quoteSchema.parse(data);
    },
    enabled: id !== "",
  });
}
