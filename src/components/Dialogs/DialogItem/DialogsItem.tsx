import React from "react";
import s from "./DialogsItem.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
  id: number | null;
  name: string | null;
};
const DialogsItem: React.FC<PropsType> = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? s.active : undefined)}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogsItem;
