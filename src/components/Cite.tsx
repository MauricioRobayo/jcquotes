import { ReactNode } from "react";

type CiteProps = {
  left: ReactNode;
  right: ReactNode;
};

const Cite = ({ left, right }: CiteProps) => {
  return (
    <cite className="px-4 py-6 text-sm flex justify-between">
      {left}
      {right}
    </cite>
  );
};

export default Cite;
