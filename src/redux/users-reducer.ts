/* eslint-disable eqeqeq */
import { UserType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { usersAPI } from './../api/users-api';




type InitialStateType = {
  users: UserType[];
  pageSize: number;
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};

let initialState: InitialStateType = {
  users: [
    {
      id: 1,
      followed: true,
      name: "Diego",
      status: "I am a boss ",
      location: { city: "Milan", country: "Italy" },
      photos: {
        small: "",
        large: "",
      },
    },
  ],
  pageSize: 12,
  totalCount: 100,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
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
    case "SETUSERS":
      return { ...state, users: [...action.users] };
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

    default:
      return state;
  }
};

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: UserType[]) => ({ type: "SETUSERS", users } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),
  setTotalCount: (totalCount: number) =>
    ({
      type: "SET_TOTAL_COUNT",
      totalCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

export type GetStateType = () => AppStateType;
export type DispatchType = () => Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch, getState: GetStateType) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.toggleIsFetching(false));

    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalCount(data.totalCount));
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

    if (res.resultCode == 0) {
      dispatch(actions.unfollowSuccess(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
  };
};

export default usersReducer;
