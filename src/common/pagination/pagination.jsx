import React from "react";
import styles from "./Pagination.module.css";

let Pagination = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>USERS WILL BE HERE</div>
      <span>Pages:</span>

      <div className={styles.pages}>
        {pages.map((p) => {
          return (
            <span
              onClick={(e) => {
                onPageChanged(p);
              }}
              className={currentPage === p && styles.selector__page}
            >
              {p}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
