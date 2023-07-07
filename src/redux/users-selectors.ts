import { createSelector } from "reselect";
import { AppStateType } from "./redux-store.ts";

export const getUserSelector = (state: AppStateType) => {
  return state.usersPage.users;
};
export const getUserState = createSelector(getUserSelector, (users) => {
  return users;
  // .filter((u) => u.photos.large && u.status);
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalCount;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
