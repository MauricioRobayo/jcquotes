import axios from "axios";
import { useQuery } from "react-query";

interface ScraperStatus {
  conclusion: "success" | "failure";
  created_at: string;
  html_url: string;
}
export function useScraperStatus() {
  return useQuery("scraper-status", async () => {
    const { data } = await axios.get<{ workflow_runs: ScraperStatus[] }>(
      "https://api.github.com/repos/MauricioRobayo/jcquotes/actions/workflows/26122816/runs"
    );
    return data.workflow_runs[0];
  });
}
