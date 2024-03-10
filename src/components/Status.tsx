import { QuoteStatus } from "@/src/components/QuoteStatus";
import { ScraperStatus } from "@/src/components/ScraperStatus";

export function Status() {
  return (
    <>
      <div className="flex gap-1 items-center">
        Quotes so far: <QuoteStatus />
      </div>
      <div className="flex gap-1 items-center">
        Scraper: <ScraperStatus />
      </div>
    </>
  );
}
