import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import QuoteLoader from "../components/QuoteLoader";
import { useRandomQuote } from "../hooks/useRandomQuote";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, isError } = useRandomQuote();

  useEffect(() => {
    if (data) {
      router.replace(`/${data.clickToTweetId}`);
    }
  }, [data, router]);

  if (isError) {
    return <div>Something unexpected happened!</div>;
  }

  return <QuoteLoader />;
};

export default Home;
