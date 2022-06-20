import React, { ReactNode } from "react";
import cn from "clsx";

type BlockquoteWrapperProps = {
  children: ReactNode;
  className?: string;
};
const Blockquote = ({ children, className = "" }: BlockquoteWrapperProps) => {
  const defaultClassName =
    "p-4 bg-gold-1 text-gold-2 dark:bg-gold-3 dark:text-gold-0 rounded-md font-serif text-xl shadow-md space-y-2";

  return (
    <blockquote className={cn(defaultClassName, className)}>
      {children}
    </blockquote>
  );
};

export default Blockquote;
