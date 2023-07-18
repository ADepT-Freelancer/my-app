import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getUserProfile,
  getUserStatus,
  updateStatus,
  savePhotoss,
  saveProfileData,
  actions,
} from "../../redux/profile-reducer.ts";
import Profile from "./Profile.tsx";
import { AppStateType } from "../../redux/redux-store.ts";
import { ProfileType } from "../../types/types.ts";
import { RouteComponentProps } from 'react-router-dom';



type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateStatus: (text: string) => void;
  savePhotoss: (file: File) => void;
  saveProfileData: (profile: ProfileType) => void;
  setEditMode: () => void;
};

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>;

type PathParamsType = {
  userId: string;
};

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        // сюди не попадаю
        this.props.history.push("/users");
      }
    }

    if (!userId) {
      throw new Error(
        " ID should be exist in params on in state ('authorizedUserID')"
      );
    } else {
      this.props.getUserProfile(userId);
      this.props.getState(userId);
    }
    this.props.getUserProfile(userId as number);
    this.props.getUserStatus(userId as number);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isProfileEditMode={this.props.isProfileEditMode}
          saveProfileData={this.props.saveProfileData}
          isOwner={!this.props.router.params.userId}
          profilePage={this.props.profilePage}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhotoss}
          setEditMode={this.props.setEditMode}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profilePage: state.profilePage,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  isProfileEditMode: state.profilePage.isProfileEditMode,
});

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
let setEditMode = actions.setEditMode;
export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateStatus,
    savePhotoss,
    saveProfileData,
    setEditMode,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
