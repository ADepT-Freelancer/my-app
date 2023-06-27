import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getUserProfile,
  getUserStatus,
  updateStatus,
  updateUrlPhoto,
  savePhotoss,
} from "./../../redux/profile-reducer";
import Profile from "./Profile";

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
          isOwner={!this.props.router.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          updatePhoto={this.props.updateUrlPhoto}
          urlPhoto={this.props.urlPhoto}
          savePhoto={this.props.savePhotoss}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.myId,
  isAuth: state.auth.isAuth,
  // urlPhoto: state.profilePage.profile.data.photos.large,
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
    updateUrlPhoto,
    savePhotoss,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
