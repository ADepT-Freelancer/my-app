import { Dispatch } from "redux";
import { ChatMessageType, StatusType } from "../api/chat-api.ts";
import { chatAPI } from "./../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";
import { FormAction } from "redux-form";

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/CHAT/MESSAGES_RECEVIED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages].filter(
          (m, index, array) => index >= array.length - 100
        ),
      };

    case "SN/CHAT/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "SN/CHAT/MESSAGES_RECEVIED",
      payload: { messages },
    } as const),

  setStatus: (status: StatusType) =>
    ({
      type: "SN/CHAT/STATUS_CHANGED",
      payload: { status },
    } as const),
};

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages: ChatMessageType[]) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessagesHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.setStatus(status));
    };
  }
  return _newMessagesHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe("message-received", newMessagesHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe("message-received", newMessagesHandlerCreator(dispatch));
  chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch: Dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
