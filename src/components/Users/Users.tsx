/* eslint-disable eqeqeq */
import React from "react";
import Pagination from "../../common/pagination/pagination.tsx";
import UserProfile from "./User.tsx";
import styles from "./users.module.css";
import { UserType } from "../../types/types";

type PropsType = {
  currentPage: number;
  onPageChanged: () => void;
  totalUsersCount: number;
  pageSize: number;
  user: UserType[];

  followingInProgress: number[];
  unfollow: () => void;
  follow: () => void;
  portionSize?: number;
  users: UserType[];
};

let Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  user,
  followingInProgress,
  unfollow,
  follow,
  users,
  ...props
}) => {
  // let pagesCount = Math.ceil(totalUsersCount / pageSize);
  // let pages = [];
  // for (let i = 1; i <= pagesCount; i++) {
  //   pages.push(i);
  // }

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={pageSize}
        totalItemsCount={totalUsersCount}
      />

      <div className={styles.users__items}>
        {users.map((user: UserType) => (
          <UserProfile
            key={user.id}
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
