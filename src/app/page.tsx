"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import QuoteLoader from "@/src/components/QuoteLoader";
import { useRandomQuote } from "@/src/hooks/useRandomQuote";

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isError } = useRandomQuote();

  useEffect(() => {
    if (data) {
      router.replace(`/${data.clickToTweetId}`);
      queryClient.invalidateQueries({ queryKey: ["quotes", "random"] });
    }
  }, [data, router, queryClient]);

  if (isError) {
    return <div>Something unexpected happened!</div>;
  }

  return <QuoteLoader />;
}
