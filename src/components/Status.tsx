import { ScraperStatus } from "@/src/components/ScraperStatus";
import { quoteService } from "@/src/services/quotes";

export async function Status() {
  const totalQuotes = await quoteService.getTotalQuotes();

  return (
    <>
      <div className="flex gap-1 items-center">
        Quotes so far: {totalQuotes}
      </div>
      <div className="flex gap-1 items-center">
        Scraper: <ScraperStatus />
      </div>
    </>
  );
}
