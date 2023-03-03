import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { VscRefresh, VscTwitter } from "react-icons/vsc";
import { useQueryClient } from "react-query";
import Cite from "../components/Cite";
import CtaButton, { CtaButtonProps } from "../components/CtaButton";
import Quote from "../components/Quote";
import QuoteLoader from "../components/QuoteLoader";
import { useQuote } from "../hooks/useQuote";
import { useRandomQuote } from "../hooks/useRandomQuote";

const QuotePage = () => {
  console.log("rendering...");
  const router = useRouter();
  const {
    query: { id },
  } = router;
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

  if (!router.isReady) {
    return null;
  }

  if (quoteQuery.isError) {
    return <ErrorPage statusCode={404} />;
  }

  if (quoteQuery.isLoading || quoteQuery.isIdle) {
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
};

export default QuotePage;
