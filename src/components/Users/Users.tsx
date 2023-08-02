/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import Pagination from "../../common/pagination/pagination.tsx";
import UsersSearchForm from "../../common/UsersSearchForm.tsx";
import { FilterType, actions, getUsers } from "../../redux/users-reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUserState,
  getUsersFilter,
} from "../../redux/users-selectors.ts";
import { UserType } from "../../types/types";
import UserProfile from "./User";

type PropsType = {};

export const Users: React.FC<PropsType> = (props) => {
  
  const dispatch = useDispatch();
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize= useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUserState);
  const followingInProgress = useSelector(getFollowingInProgress);

  console.log(users);
  console.log(3);
  

  useEffect(() => {
    getUsers(currentPage, pageSize, filter);
  }, [currentPage, filter, pageSize]);

  const onPageChanged = (pageNumber: number) => {
    getUsers(pageNumber, pageSize, filter);
    actions.setCurrentPage(pageNumber);
  };

  const onFilterChanged = (filter: FilterType) => {
    getUsers(currentPage, pageSize, filter);
  };

  const follow = (userId: number) => {
    dispatch(actions.followSuccess(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(actions.unfollowSuccess(userId));
  };
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
