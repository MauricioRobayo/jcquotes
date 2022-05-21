import { ReactNode } from "react";

type CiteProps = {
  left: ReactNode;
  right: ReactNode;
};

const Cite = ({ left, right }: CiteProps) => {
  return (
    <cite className="p-6 text-sm flex justify-between">
      {left}
      {right}
    </cite>
  );
};

export default Cite;
