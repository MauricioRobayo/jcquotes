import cn from "classnames";
import { ReactNode } from "react";

export type CtaButtonProps = {
  children: ReactNode;
  onClick: () => void;
  isLoading?: boolean;
};
const CtaButton = ({
  children,
  onClick,
  isLoading = false,
}: CtaButtonProps) => {
  return (
    <button
      className={cn(
        "text-yellow-900",
        isLoading && "animate-spin text-yellow-900/20 pointer-events-none"
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default CtaButton;
