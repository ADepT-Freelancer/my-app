import React from "react";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogItem/DialogsItem.jsx";
import Message from "./Message/Message.jsx";
import { InitialStateType } from "../../redux/dialogs-reducer.tsx";


import { InjectedFormProps, reduxForm } from "redux-form";
import {
  Textarea,
  createField,
} from "../../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";

const maxLength50 = maxLengthCreator(50);

const Dialogs: React.FC<PropsType> = (props) => {
  debugger;
  
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map((d) => (
    <DialogsItem key={d.id} name={d.name} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));
  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.addMessage(values.newMessageBody);
  };

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

const MessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsMessageFormType> &
    PropsMessageFormType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<NewMessageFormValuesKeysType>(
        "what's up?",
        "newMessageBody",
        [required, maxLength50],
        Textarea,
        {}
      )}

      <div className={s.button__box}>
        <button className={s.button}>Send</button>
      </div>
    </form>
  );
};

const MessageReduxForm = reduxForm<NewMessageFormValuesType>({
  form: "addMessageFormRedux",
})(MessageForm);

export default Dialogs;

type PropsType = {
  dialogsPage: InitialStateType;
  addMessage: (newMessageBody: string) => void;
};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>;

type PropsMessageFormType = {};
