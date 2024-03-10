import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import QuoteLoader from "../components/QuoteLoader";
import { useRandomQuote } from "../hooks/useRandomQuote";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isError } = useRandomQuote();

  useEffect(() => {
    if (data) {
      router.replace(`/${data.clickToTweetId}`);
      queryClient.invalidateQueries({ queryKey: ["quotes", "random"] });
    }
  }, [data, router, queryClient]);

  if (isError) {
    return <div>Something unexpected happened!</div>;
  }

  return <QuoteLoader />;
};

export default Home;
