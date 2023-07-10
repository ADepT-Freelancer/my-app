/* eslint-disable eqeqeq */
import { usersAPI } from "../api/api.ts";
import { UserType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, } from "./redux-store";
import { Dispatch, } from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

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
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SETUSERS:
      return { ...state, users: [...action.users] };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type ActionsTypes =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPage
  | SetTotalCount
  | ToggleIsFetchingType
  | ToggleFollowingInProgressType;

type FollowSuccessType = { type: typeof FOLLOW; userId: number };
type UnfollowSuccessType = { type: typeof UNFOLLOW; userId: number };
type SetUsersType = { type: typeof SETUSERS; users: UserType[] };

type SetCurrentPage = { type: typeof SET_CURRENT_PAGE; currentPage: number };
type SetTotalCount = { type: typeof SET_TOTAL_COUNT; totalCount: number };
type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

type ToggleFollowingInProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW,
  userId,
});
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (users: UserType[]): SetUsersType => ({
  type: SETUSERS,
  users,
});

export const setCurrentPage = (currentPage: number): SetCurrentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalCount = (totalCount: number): SetTotalCount => ({
  type: SET_TOTAL_COUNT,
  totalCount,
});
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggleFollowingInProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingInProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

type GetStateType = () => AppStateType;
type DispatchType = () => Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));

      dispatch(setUsers(data.items));
      dispatch(setTotalCount(data.totalCount));
    });
  };
};

export const follow = (userId: number): ThunkType => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId));
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode == 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingInProgress(false, userId));
    });
  };
};

export const unfollow = (userId: number): ThunkType => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId));
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode == 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingInProgress(false, userId));
    });
  };
};

export default usersReducer;
