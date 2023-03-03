import axios from "axios";
import { useQuery } from "react-query";
import { z } from "zod";

const scraperStatusSchema = z.object({
  workflow_runs: z.array(
    z.object({
      conclusion: z.union([z.literal("success"), z.literal("failure")]),
      create_at: z.string(),
      html_url: z.string(),
    })
  ),
});
export function useScraperStatus() {
  return useQuery(["scraper", "status"], async () => {
    const { data } = await axios.get(
      "https://api.github.com/repos/MauricioRobayo/jcquotes/actions/workflows/scraper.yaml/runs"
    );
    return scraperStatusSchema.parse(data).workflow_runs[0];
  });
}
