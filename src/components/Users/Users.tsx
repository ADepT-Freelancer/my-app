/* eslint-disable eqeqeq */
import React from "react";
import Pagination from "../../common/pagination/pagination.tsx";
import UserProfile from "./User.tsx";
import { UserType } from "../../types/types";
import UsersSearchForm from "../../common/UsersSearchForm.tsx";
import { FilterType } from "../../redux/users-reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
} from "../../redux/users-selectors.ts";

let Users: React.FC<PropsType> = ({
  onPageChanged,
  followingInProgress,
  unfollow,
  follow,
  users,
  ...props
}) => {
  let totalUsersCount = useSelector(getTotalUsersCount);
  let currentPage = useSelector(getCurrentPage);
  let pageSize = useSelector(getPageSize);

  const dispatch = useDispatch()

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
  // currentPage: number;
  // totalUsersCount: number;
  // pageSize: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;

  users: UserType[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;

  followingInProgress: number[];

  portionSize?: number;
};
