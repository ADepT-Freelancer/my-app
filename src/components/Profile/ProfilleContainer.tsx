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
  setEditMode,
} from "../../redux/profile-reducer.ts";
import Profile from "./Profile.jsx";
import { AppStateType } from "../../redux/redux-store.ts";

class ProfileContainer extends React.Component {
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
  authorizedUserId: state.auth.myId,
  isAuth: state.auth.isAuth,
  isProfileEditMode: state.profilePage.isProfileEditMode,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

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
