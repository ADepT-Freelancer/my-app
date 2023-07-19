import React from "react";
import s from "./Message.module.css";

type PropsType = {
  message: string | null;
};
const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={s.messages__box}>
      <div className={s.messages}>{props.message}</div>
    </div>
  );
};

export default Message;
