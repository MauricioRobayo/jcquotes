import React, { ReactNode } from "react";

type BlockquoteWrapperProps = {
  children: ReactNode;
};
const Blockquote = ({ children }: BlockquoteWrapperProps) => {
  return (
    <blockquote className="p-4 bg-gold-1 text-gold-2 dark:bg-gold-3 dark:text-gold-0 rounded-md font-serif text-xl shadow-md space-y-2">
      {children}
    </blockquote>
  );
};

export default Blockquote;
