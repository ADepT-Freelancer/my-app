import React from "react";
import Dialogs, { DispatchPropsType, MapPropsType } from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.ts";
import { actions } from "../../redux/dialogs-reducer.tsx";

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const addMessage = actions.addMessage;
export default compose<React.ComponentType>(
  connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addMessage,
  }),
  withAuthRedirect
)(Dialogs);
