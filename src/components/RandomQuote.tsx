import { Quote } from "@/src/components/Quote";
import { quoteService } from "@/src/services/quotes";

export const revalidate = 1;

export async function RandomQuote() {
  const randomQuote = await quoteService.getRandom();

  return <Quote quote={randomQuote} showLink />;
}
