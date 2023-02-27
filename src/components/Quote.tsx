import { ReactNode } from "react";
import Blockquote from "./Blockquote";
import QuoteContainer from "./QuoteContainer";

type QuoteProps = {
  cite: ReactNode;
  children: ReactNode;
  quoteContainerClassName?: string;
  blockQuoteClassName?: string;
};
const Quote = ({
  children,
  cite,
  quoteContainerClassName = "",
  blockQuoteClassName = "",
}: QuoteProps) => {
  return (
    <QuoteContainer className={quoteContainerClassName}>
      <figure>
        <Blockquote className={blockQuoteClassName}>{children}</Blockquote>
        <figcaption>{cite}</figcaption>
      </figure>
    </QuoteContainer>
  );
};

export default Quote;
