import { ReactNode } from "react";

type QuoteContainerProps = {
  children: ReactNode;
};
const QuoteContainer = ({ children }: QuoteContainerProps) => {
  return <div className="max-w-sm w-full">{children}</div>;
};

export default QuoteContainer;
