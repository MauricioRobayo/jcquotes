"use client";
import { Quote } from "@/src/components/Quote";
import QuoteLoader from "@/src/components/QuoteLoader";
import type { Quote as QuoteType } from "jcscraper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSync, IoLinkOutline } from "react-icons/io5";

export function RandomQuote() {
  const [randomQuote, setRandomQuote] = useState<QuoteType | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "refreshing"
  >("idle");

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchRandomQuote() {
      setStatus("loading");
      const response = await fetch("/api/quotes/random", {
        signal: abortController.signal,
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      const quote = await response.json();
      setRandomQuote(quote);
    }

    fetchRandomQuote();
    return () => {
      abortController.abort();
    };
  }, []);

  async function onRefreshClick() {
    setStatus("refreshing");
    const response = await fetch("/api/quotes/random");

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    const quote = await response.json();
    setRandomQuote(quote);
  }

  if (status === "loading" || status === "idle" || !randomQuote) {
    return <QuoteLoader />;
  }

  return (
    <Quote
      quote={randomQuote}
      actions={[
        <Link
          href={`/${randomQuote.clickToTweetId}`}
          title="Open quote"
          aria-label="Open quote"
        >
          <IoLinkOutline />
        </Link>,
        <button
          onClick={onRefreshClick}
          aria-label="Refresh quote"
          title="Refresh quote"
        >
          <IoSync className={status === "refreshing" ? "animate-spin" : ""} />
        </button>,
      ]}
    />
  );
}
