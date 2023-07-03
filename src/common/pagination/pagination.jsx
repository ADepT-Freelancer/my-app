import React, { useState } from "react";
import styles from "./Pagination.module.css";

let Pagination = ({
  currentPage,
  onPageChanged,
  totalItemsCount,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / portionSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      <div className={styles.pagination}>
        {
          <button
            className={styles.pagination__button}
            disabled={portionNumber <= 1 && "disabled"}
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          >
            PREV
          </button>
        }

        {pages
          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p) => {
            return (
              <span
                className={currentPage === p && styles.selector__page}
                onClick={(e) => {
                  onPageChanged(p);
                }}
              >
                {p}
              </span>
            );
          })}
        { (
          <button
            className={styles.pagination__button}
             disabled={portionCount === portionNumber  && "disabled"}
            onClick={() => setPortionNumber(portionNumber + 1)}
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
