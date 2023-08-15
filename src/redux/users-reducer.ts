/* eslint-disable eqeqeq */
import { Dispatch } from "redux";
import { UserType } from "../types/types";
import { usersAPI } from "./../api/users-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

let initialState = {
  users: [] as UserType[],
  pageSize: 12,
  totalCount: 100,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as number[],
  filter: {
    term: " ",
    friend: null as null | boolean,
  },
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case "SET_USERS": {
      debugger;
      return { ...state, users: [...action.users] };
    }
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.totalCount };
    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: UserType[]) => ({ type: "SET_USERS", users } as const),
  setFilter: (filter: FilterType) =>
    ({ type: "SET_FILTER", payload: filter } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: "SET_CURRENT_PAGE", currentPage } as const),
  setTotalCount: (totalCount: number) =>
    ({ type: "SET_TOTAL_COUNT", totalCount } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
};

export const getUsers = (
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkType => {
  debugger;
  return async (dispatch) => {
    let data = await usersAPI.getUsers(
      currentPage,
      pageSize,
      filter.term,
      filter.friend
    );
    debugger;
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));

    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
  };
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let res = await usersAPI.follow(userId);

    if (res.resultCode == 0) {
      dispatch(actions.followSuccess(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let res = await usersAPI.unfollow(userId);

    if (res.resultCode === 0) {
      dispatch(actions.unfollowSuccess(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
  };
};

export default usersReducer;

export type GetStateType = () => AppStateType;
export type DispatchType = () => Dispatch<ActionsTypes>;
export type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
