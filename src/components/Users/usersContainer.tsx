import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../../common/preloader/preloader";
import { getIsFetching } from "./../../redux/users-selectors.ts";
import { Users } from "./Users";

type UserPagePropsType = {
  pageTitle: string;
};

export const UserPage: React.FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
