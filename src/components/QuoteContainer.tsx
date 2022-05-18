import { ReactNode } from "react";

type QuoteContainerProps = {
  children: ReactNode;
};
const QuoteContainer = ({ children }: QuoteContainerProps) => {
  return <div className="max-w-sm w-full mx-2">{children}</div>;
};

export default QuoteContainer;
