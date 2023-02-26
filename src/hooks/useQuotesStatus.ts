import axios from "axios";
import { QuoteType } from "jcscraper";
import { useQuery } from "react-query";
import { Status } from "../services/quotes";

export function useQuotesStatus() {
  return useQuery("quotes-status", async () => {
    const { data } = await axios.get<Status>(
      `${process.env.NEXT_PUBLIC_API_URL}/status`
    );
    return data;
  });
}
