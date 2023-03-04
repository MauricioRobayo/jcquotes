import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useQuotesStatus } from "../hooks/useQuotesStatus";
import { useScraperStatus } from "../hooks/useScraperStatus";
import { Spinner } from "./Spinner";

export function Status() {
  const scraperStatusQuery = useScraperStatus();
  const quotesStatusQuery = useQuotesStatus();

  return (
    <>
      <div className="flex gap-1 items-center">
        Quotes so far:{" "}
        {quotesStatusQuery.isLoading ? (
          <Spinner />
        ) : quotesStatusQuery.isError ? (
          "E!"
        ) : (
          quotesStatusQuery.data.totalQuotes
        )}
      </div>
      <div className="flex gap-1 items-center">
        Scraper:{" "}
        {scraperStatusQuery.isLoading ? (
          <Spinner />
        ) : scraperStatusQuery.isError ? (
          "E!"
        ) : (
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
        )}
      </div>
    </>
  );
}
