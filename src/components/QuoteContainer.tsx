import { ReactNode } from "react";
import cn from "classnames";

type QuoteContainerProps = {
  children: ReactNode;
  className?: string;
};
const QuoteContainer = ({ children, className = "" }: QuoteContainerProps) => {
  const defaultClassName = "max-w-sm w-full mx-4";

  return <div className={cn(defaultClassName, className)}>{children}</div>;
};

export default QuoteContainer;
