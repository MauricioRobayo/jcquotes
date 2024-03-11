import { Link } from "@/src/components/Link";
import { RandomQuote } from "@/src/components/RandomQuote";
import { getDateFromSource } from "@/src/helpers/date";
import { quoteService } from "@/src/services/quotes";

export default async function Page() {
  const allQuotes = await quoteService.getLatestQuotes();

  return (
    <div className="flex flex-col gap-4 justify-center align-center">
      <RandomQuote />
      <h2>Latest Quotes</h2>
      <ul className="flex flex-col max-w-md gap-2">
        {allQuotes.map((quote) => (
          <li key={quote.clickToTweetId} className="flex flex-col">
            <div className="text-sm  opacity-75">
              {getDateFromSource(quote.source)}
            </div>
            <Link
              className="w-full truncate text-lg no-underline hover:underline font-normal font-serif"
              href={`/${quote.clickToTweetId}`}
            >
              {quote.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
