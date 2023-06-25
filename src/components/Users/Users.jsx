/* eslint-disable eqeqeq */
import React from "react";
import Pagination from "../../common/pagination/pagination";
import UserProfile from "./User";
import styles from "./users.module.css";

let Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  user,
  followingInProgress,
  unfollow,
  follow,
  ...props
}) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={pageSize}
        totalItemsCount={totalUsersCount}
      />

      <div className={styles.users__items}>
        {props.users.map((user) => (
          <UserProfile
            user={user}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
