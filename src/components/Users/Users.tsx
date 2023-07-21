/* eslint-disable eqeqeq */
import React from "react";
import Pagination from "../../common/pagination/pagination.tsx";
import UserProfile from "./User.tsx";
import { UserType } from "../../types/types";
import UsersSearchForm from "../../common/UsersSearchForm.tsx";
import { FilterType } from "../../redux/users-reducer.ts";

let Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,

  pageSize,
  // user,
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
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={pageSize}
        totalItemsCount={totalUsersCount}
      />

      <div className="users__items">
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

type PropsType = {
  isFetching: boolean;
  totalUsersCount: number;
  pageSize: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;

  users: UserType[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;

  followingInProgress: number[];

  currentPage: number;
  // user: UserType[];
  portionSize?: number;
};
