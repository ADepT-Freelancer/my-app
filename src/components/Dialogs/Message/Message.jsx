import React from "react";
import s from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={s.messages__box}>
  <div className={s.messages}>{props.message}</div>

</div>
  );
};

export default Message;
