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
      className={
        isLoading ? "animate-spin text-gold-1 pointer-events-none" : ""
      }
      onClick={onClick}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default CtaButton;
