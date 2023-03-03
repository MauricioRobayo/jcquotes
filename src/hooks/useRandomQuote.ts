import axios from "axios";
import { quoteSchema } from "jcscraper/dist/schema";
import { useQuery, useQueryClient } from "react-query";

export function useRandomQuote() {
  const queryClient = useQueryClient();
  return useQuery(
    ["quotes", "random"],
    async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/random`
      );
      return quoteSchema.parse(data);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["quote", "detail", data.clickToTweetId],
          data
        );
      },
    }
  );
}
