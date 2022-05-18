import { useRouter } from "next/router";
import Quote from "../components/Quote";

const QuotePage = () => {
  const { query, isReady } = useRouter();
  const id = query.id as string;

  if (!isReady) {
    return null;
  }

  return <Quote id={id} />;
};

export default QuotePage;
