import { useQuotesStatus } from "./useQuotesStatus";
import { useScraperStatus } from "./useScraperStatus";

export function useStatus() {
  const quotesStatus = useQuotesStatus();
  const scraperStatus = useScraperStatus();

  if (quotesStatus.isIdle || scraperStatus.isIdle) {
    return {
      isError: false,
      isIdle: true,
      isLoading: false,
      isSuccess: false,
    } as const;
  }

  if (quotesStatus.isLoading || scraperStatus.isLoading) {
    return {
      isError: false,
      isIdle: false,
      isLoading: true,
      isSuccess: false,
    } as const;
  }

  if (quotesStatus.isError || scraperStatus.isError) {
    return {
      error: quotesStatus.error ?? scraperStatus.error,
      isError: true,
      isIdle: false,
      isLoading: false,
      isSuccess: false,
    } as const;
  }

  console.log(scraperStatus);
  return {
    data: {
      ...quotesStatus.data,
      scraperStatus: scraperStatus.data,
    },
    isError: false,
    isIdle: false,
    isLoading: false,
    isSuccess: true,
  } as const;
}
