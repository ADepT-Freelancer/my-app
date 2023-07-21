import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "../../common/preloader/preloader";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store.ts";
import {
  actions,
  getUsers,
  follow,
  unfollow,
  FilterType,
} from "./../../redux/users-reducer.ts";
import Users from "./Users.tsx";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUserState,
  getUsersFilter,
} from "./../../redux/users-selectors.ts";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: UserType[];
  followingInProgress: number[];
  filter: FilterType;
};
type MapDispatchPropsType = {
  getUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  setCurrentPage: (pageNumber: number) => void;
};
type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(
      pageNumber,
      this.props.pageSize,
      this.props.filter,

    );
    this.props.setCurrentPage(pageNumber);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.getUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          // totalUsersCount={this.props.totalUsersCount}
          // pageSize={this.props.pageSize}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          // currentPage={this.props.currentPage}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          isFetching={this.props.isFetching}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUserState(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

// let mapStateToProps = (state: AppStateType) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

let setCurrentPage = actions.setCurrentPage;
let toggleFollowingInProgress = actions.toggleFollowingInProgress;

export default compose(
  // withAuthRedirect,

  //TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState

  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingInProgress,
    getUsers,
  })
)(UsersContainer);
