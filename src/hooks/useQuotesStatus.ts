import axios from "axios";
import { useQuery } from "react-query";
import { Status } from "../services/quotes";
import { quoteKeys } from "./quote-keys";

export function useQuotesStatus() {
  return useQuery(quoteKeys.status(), async () => {
    const { data } = await axios.get<Status>(
      `${process.env.NEXT_PUBLIC_API_URL}/status`
    );
    return data;
  });
}
