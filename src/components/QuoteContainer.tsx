import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type QuoteContainerProps = {
  children: ReactNode;
  className?: string;
};
const QuoteContainer = ({ children, className = "" }: QuoteContainerProps) => {
  const defaultClassName = "max-w-md w-full";

  return <div className={twMerge(defaultClassName, className)}>{children}</div>;
};

export default QuoteContainer;
