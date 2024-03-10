"use client";

import Cite from "@/src/components/Cite";
import CtaButton, { type CtaButtonProps } from "@/src/components/CtaButton";
import type { Quote } from "jcscraper";
import { VscRefresh, VscTwitter } from "react-icons/vsc";
import Blockquote from "./Blockquote";
import QuoteContainer from "./QuoteContainer";
import { getDateFromSource } from "@/src/helpers/date";
import { Link } from "@/src/components/Link";

type QuoteProps = {
  quote: Quote;
};
export function Quote({ quote }: QuoteProps) {
  const tweet = () => {
    window.location.assign(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        quote.rawText
      )}`
    );
  };
  const quoteDate = getDateFromSource(quote.source);

  const ctaButtons: (CtaButtonProps & { key: string })[] = [
    {
      children: <VscRefresh />,
      onClick: () => null,
      key: "refresh",
    },
    {
      children: <VscTwitter />,
      onClick: tweet,
      key: "twitter",
    },
  ];

  const citeLeft = <Link href={quote.source}>{quoteDate}</Link>;
  const citeRight = (
    <div className="flex items-center justify-center gap-6">
      {ctaButtons.map(({ key, ...props }) => (
        <CtaButton key={key} {...props} />
      ))}
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
