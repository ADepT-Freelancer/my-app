import React from "react";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import DialogsItem from "./DialogItem/DialogsItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import { Textarea } from "../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogsPage.dialogs.map((d) => (
    <DialogsItem key={d.id} name={d.name} id={d.id} />
  ));

  let messagesElements = props.state.dialogsPage.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Navigate to={"/login"} />;

  return (
    <div className={s.dialogs}>
      <div>{dialogsElements}</div>
      <div>
        <div className={s.answers}>{messagesElements}</div>
        <MessageReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

const MessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newMessageBody"
        placeholder="what's up?"
        validate={[required, maxLength50]}

      />
      <div className={s.button__box}>
        <button className={s.button}>Send</button>
      </div>
    </form>
  );
};

const MessageReduxForm = reduxForm({ form: "addMessageFormRedux" })(
  MessageForm
);

export default Dialogs;
