"use client";

import { Spinner } from "@/src/components/Spinner";
import { useQuotesStatus } from "@/src/hooks/useQuotesStatus";

export function QuoteStatus() {
  const quotesStatusQuery = useQuotesStatus();

  if (quotesStatusQuery.isLoading) {
    return <Spinner />;
  }

  if (quotesStatusQuery.isError || quotesStatusQuery.data === undefined) {
    return "E!";
  }

  return quotesStatusQuery.data.totalQuotes;
}
