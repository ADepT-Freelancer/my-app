import React from "react";
import { connect } from "react-redux";
import { getAuthUserData } from "./../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData()
    // authAPI.me().then((response) => {
    //   if (response.data.resultCode === 0) {
    //     let { userId, login, email } = response.data.data;
    //     this.props.setAuthUserData(userId, login, email);
    //   }
    // });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
