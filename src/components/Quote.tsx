"use client";

import Cite from "@/src/components/Cite";
import CtaButton, { type CtaButtonProps } from "@/src/components/CtaButton";
import { Link } from "@/src/components/Link";
import { getDateFromSource } from "@/src/helpers/date";
import type { Quote } from "jcscraper";
import { VscTwitter } from "react-icons/vsc";
import Blockquote from "./Blockquote";
import QuoteContainer from "./QuoteContainer";
import { IoUnlink } from "react-icons/io5";

type QuoteProps = {
  quote: Quote;
  showLink: boolean;
};
export function Quote({ quote, showLink = false }: QuoteProps) {
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
      {showLink && (
        <Link href={`/${quote.clickToTweetId}`} title="Permalink">
          <IoUnlink />
        </Link>
      )}
      <CtaButton onClick={tweet}>
        <VscTwitter />
      </CtaButton>
    </div>
  );

  const cite = <Cite left={citeLeft} right={citeRight} />;
  return (
    <QuoteContainer>
      <figure>
        <Blockquote>
          {quote.text.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Blockquote>
        <figcaption>{cite}</figcaption>
      </figure>
    </QuoteContainer>
  );
}
