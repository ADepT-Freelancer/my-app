import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer.tsx";
import Header, {
  DispatchPropsType,
  MapPropsType,
  PropsType,
} from "./Header.tsx";
import { AppStateType } from "../../redux/redux-store.ts";

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  { logout }
)(HeaderContainer);
