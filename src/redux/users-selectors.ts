import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";
import { InitialStateType } from "./users-reducer";
import { UserType } from "../types/types";

export const getUserSelector = (state: AppStateType): UserType[] => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.users;
};
export const getUserState = createSelector(getUserSelector, (users) => {
  return users;
  // .filter((u) => u.photos.large && u.status);
});

export const getPageSize = (state: AppStateType) => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.pageSize;
};
export const getTotalUsersCount = (state: AppStateType) => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.totalCount;
};
export const getCurrentPage = (state: AppStateType) => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppStateType) => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.followingInProgress;
};
export const getUsersFilter = (state: AppStateType) => {
  let usersPage: InitialStateType = state.usersPage;

  return usersPage.filter;
};
