import React from "react";
import s from "./Dialogs.module.css";
import DialogsItem from "./DialogItem/DialogsItem.tsx";
import Message from "./Message/Message.tsx";
import { InitialStateType } from "../../redux/dialogs-reducer.tsx";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  Textarea,
  createField,
} from "../../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";

const maxLength50 = maxLengthCreator(50);

const Dialogs: React.FC<PropsType> = ({ addMessage, dialogsPage }) => {
  let state = dialogsPage;
  let dialogsElements = state.dialogs.map((d) => (
    <DialogsItem key={d.id} name={d.name} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));
  let addNewMessage = (values: NewMessageFormValuesType) => {
    addMessage(values.newMessageBody);
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

export type MapPropsType = {
  dialogsPage: InitialStateType;
};

export type DispatchPropsType = {
  addMessage: (newMessageBody: string) => void;
};

export type PropsType = MapPropsType & DispatchPropsType;

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>;

type PropsMessageFormType = {};
