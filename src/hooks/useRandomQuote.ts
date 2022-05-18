import axios from "axios";
import { QuoteType } from "jcscraper";
import { useQuery, useQueryClient } from "react-query";

export function useRandomQuote() {
  const queryClient = useQueryClient();
  return useQuery(
    "random",
    async () => {
      const { data } = await axios.get<QuoteType>(
        `${process.env.NEXT_PUBLIC_API_URL}/random`
      );

      return data;
    },
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        queryClient.setQueryData(["quote", data.clickToTweetId], data);
      },
    }
  );
}
