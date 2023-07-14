import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router";
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
import Profile from "./Profile.jsx";
import { AppStateType } from "../../redux/redux-store.ts";

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: string) => void;
  updateStatus: (userId: string) => void;
  savePhotoss: (userId: File) => void;
  saveProfileData: (userId: number) => void;
  setEditMode: () => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

type PathParamsType = {
  userId: string;
};

class ProfileContainer extends React.Component<
  PropsType & RouteComponentProps<PathParamsType>
> {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        // сюди не попадаю
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
          urlPhoto={this.props.urlPhoto}
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
export default compose(
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
