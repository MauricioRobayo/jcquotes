import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useQuotesStatus } from "../hooks/useQuotesStatus";
import { useScraperStatus } from "../hooks/useScraperStatus";
import { Spinner } from "./Spinner";

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

function QuoteStatus() {
  const quotesStatusQuery = useQuotesStatus();

  if (quotesStatusQuery.isLoading) {
    return <Spinner />;
  }

  if (quotesStatusQuery.isError || quotesStatusQuery.data === undefined) {
    return "E!";
  }

  return quotesStatusQuery.data.totalQuotes;
}

function ScraperStatus() {
  const scraperStatusQuery = useScraperStatus();

  if (scraperStatusQuery.isLoading) {
    return <Spinner />;
  }

  if (scraperStatusQuery.isError || scraperStatusQuery.data === undefined) {
    return "E!";
  }

  return (
    <>
      <a href={scraperStatusQuery.data.html_url}>
        {new Date(scraperStatusQuery.data.created_at).toISOString()}
      </a>
      {scraperStatusQuery.data.conclusion === "success" ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineCloseCircle />
      )}
    </>
  );
}
