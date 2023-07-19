import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapPropsType = {
  isAuth: boolean;
};
type DispatchPropsType = {};

export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType > = (
    props
  ) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) return <Navigate to="/login" />;
    return <WrappedComponent {...restProps as unknown  as any } />;
  };

  let ConnectedAuthRedirectComponent = connect<
    MapPropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(mapStateToPropForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
