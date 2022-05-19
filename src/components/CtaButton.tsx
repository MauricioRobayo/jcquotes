import { ReactNode } from "react";

export type CtaButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};
const CtaButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
}: CtaButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default CtaButton;
