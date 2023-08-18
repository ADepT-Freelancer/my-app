/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersSearchForm from "../../common/UsersSearchForm.tsx";
import Pagination from "../../common/pagination/pagination.tsx";
import {
  FilterType,
  actions,
  requestUsers,
} from "../../redux/users-reducer.ts";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  // getUsersSelector,
  getUsersState,
} from "../../redux/users-selectors.ts";
import { UserType } from "../../types/types";
import UserProfile from "./User";

type PropsType = {};

export const Users: React.FC<PropsType> = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsersState);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useNavigate();

  // useEffect(() => {
  //   const parsed = queryString.parse(history.location.search.substr(1)) as {
  //     term: string;
  //     page: string;
  //     friend: string;
  //   };
  // });

  useEffect(() => {
    history(
      `?page=${currentPage}&count=${pageSize}&term=${filter.term}` +
        (filter.friend === null ? "" : `&friend=${filter.friend}`)
    );
  }, [filter, currentPage]);

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {

    dispatch(requestUsers(pageNumber, pageSize, filter));
    // actions.setCurrentPage(pageNumber);
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(currentPage, pageSize, filter));
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
        {users &&
          users.map((user: UserType) => (
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
