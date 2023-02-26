import { useStatus } from "../hooks/useStatus";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export function Status() {
  const { data, isIdle, isLoading, isError } = useStatus();
  if (isIdle || isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Oh boy!</div>;
  }

  return (
    <div className="flex flex-col text-sm">
      <div>Total quotes so far: {data.totalQuotes}</div>
      <div className="flex gap-1 items-center">
        Last scraper:{" "}
        <a href={data.scraperStatus.html_url} className="font-normal">
          {new Date(data.scraperStatus.created_at).toISOString()}
        </a>
        {data.scraperStatus.conclusion === "success" ? (
          <AiFillCheckCircle />
        ) : (
          <AiFillCloseCircle />
        )}
      </div>
    </div>
  );
}
