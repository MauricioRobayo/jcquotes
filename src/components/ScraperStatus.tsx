import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { z } from "zod";

export async function ScraperStatus() {
  const scraperStatus = await getScraperStatus();

  return (
    <>
      <a href={scraperStatus.html_url}>
        {new Date(scraperStatus.created_at).toISOString()}
      </a>
      {scraperStatus.conclusion === "success" ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineCloseCircle />
      )}
    </>
  );
}

const scraperStatusSchema = z.object({
  workflow_runs: z.array(
    z.object({
      conclusion: z.union([z.literal("success"), z.literal("failure")]),
      created_at: z.string(),
      html_url: z.string(),
    })
  ),
});
async function getScraperStatus() {
  const response = await fetch(
    "https://api.github.com/repos/MauricioRobayo/jcquotes/actions/workflows/scraper.yaml/runs"
  );

  const data = await response.json();
  return scraperStatusSchema.parse(data).workflow_runs[0];
}
