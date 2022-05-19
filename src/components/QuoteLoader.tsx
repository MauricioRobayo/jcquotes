import styles from "./Quote.module.css";
import QuoteContainer from "./QuoteContainer";

const QuoteLoader = () => {
  return (
    <QuoteContainer>
      <div className={styles.quote}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-3 bg-gold-2/20 dark:bg-gold-1/20 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-gold-2/20 dark:bg-gold-1/20 rounded col-span-2"></div>
              <div className="h-3 bg-gold-2/20 dark:bg-gold-1/20 rounded col-span-1"></div>
            </div>
            <div className="h-3 bg-gold-2/20 dark:bg-gold-1/20 rounded"></div>
          </div>
        </div>
      </div>
    </QuoteContainer>
  );
};

export default QuoteLoader;
