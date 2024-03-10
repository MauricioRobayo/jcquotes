"use client";

import { Spinner } from "@/src/components/Spinner";
import { useScraperStatus } from "@/src/hooks/useScraperStatus";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export function ScraperStatus() {
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
