import React from "react";
import DialogsItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css"


const Dialogs = (props) => {
  

  let dialogsElements = props.dialogs.map((d) => (
    <DialogsItem name={d.name} id={d.id} />
  ));

  let messagesElements = props.messages.map((m) => <Message message={m.message} />);

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsElements}>{dialogsElements}</div>
      <div className={s.messagesElements}>{messagesElements} </div>
    </div>
  );
};

export default Dialogs;
