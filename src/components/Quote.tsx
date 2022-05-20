import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { VscRefresh, VscTwitter } from "react-icons/vsc";
import { useQueryClient } from "react-query";
import { useQuote } from "../hooks/useQuote";
import { useRandomQuote } from "../hooks/useRandomQuote";
import Blockquote from "./Blockquote";
import CtaButton, { CtaButtonProps } from "./CtaButton";
import QuoteContainer from "./QuoteContainer";
import QuoteLoader from "./QuoteLoader";

type QuoteProps = {
  id: string;
};
const Quote = ({ id }: QuoteProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const randomQuoteQuery = useRandomQuote();
  const quoteQuery = useQuote(id);

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
      queryClient.invalidateQueries("random");
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
    return <ErrorPage statusCode={404} />;
  }

  if (quoteQuery.isLoading || quoteQuery.isIdle) {
    return <QuoteLoader />;
  }

  return (
    <QuoteContainer>
      <figure>
        <Blockquote>
          {quoteQuery.data.text.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Blockquote>
        <figcaption>
          <cite className="p-6 text-sm flex justify-between">
            <a href={quoteQuery.data.source}>{quoteDate}</a>
            <div className="flex items-center justify-center gap-6">
              {ctaButtons.map(({ key, ...props }) => (
                <CtaButton key={key} {...props} />
              ))}
            </div>
          </cite>
        </figcaption>
      </figure>
    </QuoteContainer>
  );
};

export default Quote;
