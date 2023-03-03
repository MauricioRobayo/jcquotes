import axios from "axios";
import { QuoteType } from "jcscraper";
import { useQuery, useQueryClient } from "react-query";

export function useRandomQuote() {
  const queryClient = useQueryClient();
  return useQuery(
    ["quotes", "random"],
    async (): Promise<QuoteType> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/random`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["quote", data.clickToTweetId], data);
      },
    }
  );
}
