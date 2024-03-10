import { ScraperStatus } from "@/src/components/ScraperStatus";
import { quoteService } from "@/src/services/quotes";

export async function Status() {
  const quoteStatus = await quoteService.getStatus();

  return (
    <>
      <div className="flex gap-1 items-center">
        Quotes so far: {quoteStatus.totalQuotes}
      </div>
      <div className="flex gap-1 items-center">
        Scraper: <ScraperStatus />
      </div>
    </>
  );
}
