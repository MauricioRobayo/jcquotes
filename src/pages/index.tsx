import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Quote from "../components/Quote";
import QuoteLoader from "../components/QuoteLoader";
import { useRandomQuote } from "../hooks/useRandomQuote";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, isIdle, isLoading, isError } = useRandomQuote();

  useEffect(() => {
    if (data) {
      router.replace(`/${data.clickToTweetId}`);
    }
  }, [data, router]);

  if (isIdle) {
    return null;
  }

  if (isLoading) {
    return <QuoteLoader />;
  }

  if (isError) {
    return <div>Something unexpected happened!</div>;
  }

  return <Quote id={data.clickToTweetId} />;
};

export default Home;
