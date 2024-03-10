import React, { ReactNode } from "react";
import { Crimson_Pro } from "next/font/google";
import { twMerge } from "tailwind-merge";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
});

type BlockquoteWrapperProps = {
  children: ReactNode;
  className?: string;
};
const Blockquote = ({ children, className = "" }: BlockquoteWrapperProps) => {
  return (
    <blockquote
      className={twMerge(
        crimsonPro.variable,
        "p-4 bg-gold-1 text-gold-2 dark:bg-gold-3 dark:text-gold-0 rounded-md font-serif text-xl shadow-md space-y-2 font-light",
        className
      )}
    >
      {children}
    </blockquote>
  );
};

export default Blockquote;
