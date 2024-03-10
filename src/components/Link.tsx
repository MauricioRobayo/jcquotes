import NextLink from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Link({ className, ...props }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={twMerge(
        "font-bold underline underline-offset-4 decoration-gold-1 dark:decoration-gold-3 decoration-4",
        className
      )}
      {...props}
    />
  );
}
