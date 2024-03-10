import { Quote } from "@/src/components/Quote";
import QuoteLoader from "@/src/components/QuoteLoader";
import { quoteService } from "@/src/services/quotes";
import { Suspense } from "react";

export default async function Page() {
  const randomQuote = await quoteService.getRandom();

  return (
    <Suspense fallback=<QuoteLoader />>
      <Quote quote={randomQuote} />
    </Suspense>
  );
}
