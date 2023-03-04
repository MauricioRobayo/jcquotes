import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Status } from "../services/quotes";
import { quoteKeys } from "./quote-keys";

export function useQuotesStatus() {
  return useQuery({
    queryKey: quoteKeys.status,
    queryFn: async () => {
      const { data } = await axios.get<Status>(
        `${process.env.NEXT_PUBLIC_API_URL}/status`
      );
      return data;
    },
  });
}
