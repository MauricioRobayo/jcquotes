import axios from "axios";
import { quoteSchema } from "jcscraper/dist/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { quoteKeys } from "./quote-keys";

export function useRandomQuote() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: quoteKeys.random,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/random`
      );
      return quoteSchema.parse(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(quoteKeys.details(data.clickToTweetId), data);
    },
  });
}
