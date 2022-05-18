import styles from "./Quote.module.css";
import QuoteContainer from "./QuoteContainer";

const QuoteLoader = () => {
  return (
    <QuoteContainer>
      <div className={styles.quote}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-yellow-900/60 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-yellow-900/60 rounded col-span-2"></div>
              <div className="h-2 bg-yellow-900/60 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-yellow-900/60 rounded"></div>
          </div>
        </div>
      </div>
    </QuoteContainer>
  );
};

export default QuoteLoader;
