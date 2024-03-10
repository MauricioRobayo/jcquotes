"use client";

import "@/src/styles/globals.css";

import Cite from "@/src/components/Cite";
import CtaButton, { type CtaButtonProps } from "@/src/components/CtaButton";
import Quote from "@/src/components/Quote";
import QuoteLoader from "@/src/components/QuoteLoader";
import { useQuote } from "@/src/hooks/useQuote";
import { useRandomQuote } from "@/src/hooks/useRandomQuote";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { VscRefresh, VscTwitter } from "react-icons/vsc";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const randomQuoteQuery = useRandomQuote();
  const quoteQuery = useQuote(typeof id === "string" ? id : "");
  const quoteDate = useMemo(() => {
    if (quoteQuery.data) {
      const date = Date.parse(quoteQuery.data.source.replace(/.*\//, ""));
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(date);
    }
  }, [quoteQuery]);
  const refresh = () => {
    if (randomQuoteQuery.data) {
      router.push(`/${randomQuoteQuery.data.clickToTweetId}`);
      queryClient.invalidateQueries({ queryKey: ["quotes", "random"] });
    }
  };
  const tweet = () => {
    if (quoteQuery.data) {
      window.location.assign(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          quoteQuery.data.rawText
        )}`
      );
    }
  };

  const ctaButtons: (CtaButtonProps & { key: string })[] = [
    {
      children: <VscRefresh />,
      onClick: refresh,
      key: "refresh",
      disabled: randomQuoteQuery.isFetching,
      className: randomQuoteQuery.isFetching
        ? "animate-spin text-gold-1 dark:text-gold-3 pointer-events-none"
        : "",
    },
    {
      children: <VscTwitter />,
      onClick: tweet,
      key: "twitter",
    },
  ];

  if (quoteQuery.isError) {
    return <div>Something unexpected Happened!</div>;
  }

  if (quoteQuery.isLoading || quoteQuery.data === undefined) {
    return <QuoteLoader />;
  }

  const citeLeft = <a href={quoteQuery.data.source}>{quoteDate}</a>;
  const citeRight = (
    <div className="flex items-center justify-center gap-6">
      {ctaButtons.map(({ key, ...props }) => (
        <CtaButton key={key} {...props} />
      ))}
    </div>
  );

  const cite = <Cite left={citeLeft} right={citeRight} />;

  return (
    <Quote cite={cite}>
      {quoteQuery.data.text.split("\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </Quote>
  );
}
