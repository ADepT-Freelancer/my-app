import React from "react";
import DialogsItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogsPage.dialogs.map((d) => (
    <DialogsItem key={d.id} name={d.name} id={d.id} />
  ));

  let messagesElements = props.state.dialogsPage.messages.map((m) => (
    <Message key={m.id}  message={m.message} />
  ));

  let newMessage = React.createRef();

  let addMessage = () => {
    props.addMessage();
  };

  let onMessageChange = (e) => {
    let text = e.target.value;

    props.updateNewMessageText(text);
  };

  return (
    <div className={s.dialogs}>
      <div>{dialogsElements}</div>
      <div>
        <div className={s.answers}>{messagesElements}</div>
        <div>
          <textarea
            placeholder="what's up?"
            onChange={onMessageChange}
            value={props.state.dialogsPage.newMessageText}
            ref={newMessage}
          ></textarea>
          <div className={s.button__box}>
            <button className={s.button} onClick={addMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
