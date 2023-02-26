import { useStatus } from "../hooks/useStatus";

export function Status() {
  const { data, isIdle, isLoading, isError } = useStatus();
  if (isIdle || isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Oh boy!</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-col text-sm">
      <div>Total quotes so far: {data.totalQuotes}</div>
      {data.latestQuote && (
        <div>
          Latest quotes from:{" "}
          <a href={data.latestQuote.source}>
            {data.latestQuote.source.replace(/^.*\//g, "")}
          </a>
        </div>
      )}
      <div>
        Last scraped on:{" "}
        <a href={data.scraperStatus.html_url}>
          {new Date(data.scraperStatus.created_at).toISOString()}
        </a>
      </div>
      <div>Scraper status: {data.scraperStatus.conclusion}</div>
    </div>
  );
}
