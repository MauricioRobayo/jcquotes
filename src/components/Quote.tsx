"use client";

import Cite from "@/src/components/Cite";
import CtaButton from "@/src/components/CtaButton";
import { Link } from "@/src/components/Link";
import { getDateFromSource } from "@/src/helpers/date";
import type { Quote } from "jcscraper";
import { Fragment, type ReactNode } from "react";
import { VscTwitter } from "react-icons/vsc";
import Blockquote from "./Blockquote";

type QuoteProps = {
  quote: Quote;
  actions?: ReactNode[];
};
export function Quote({ quote, actions = [] }: QuoteProps) {
  const tweet = () => {
    window.location.assign(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        quote.rawText
      )}`
    );
  };
  const quoteDate = getDateFromSource(quote.source);

  const citeLeft = <Link href={quote.source}>{quoteDate}</Link>;
  const citeRight = (
    <div className="flex items-center justify-center gap-6">
      {actions.map((action, i) => (
        <Fragment key={i}>{action}</Fragment>
      ))}
      <CtaButton onClick={tweet}>
        <VscTwitter />
      </CtaButton>
    </div>
  );

  const cite = <Cite left={citeLeft} right={citeRight} />;
  return (
    <figure>
      <Blockquote>
        {quote.text.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Blockquote>
      <figcaption>{cite}</figcaption>
    </figure>
  );
}
