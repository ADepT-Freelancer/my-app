const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState: InitialStateType = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo2" },
    { id: 5, message: "Yo" },
  ],

  dialogs: [
    { id: 1, name: "Dima" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Svetas" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Victor" },
    { id: 6, name: "Valera" },
  ],
};

type MessagesType = { id: null | number; message: null | string };

type DialogsType = { id: null | number; name: null | string };

export type InitialStateType = {
  messages: MessagesType[];

  dialogs: DialogsType[];
};
let testArray: InitialStateType = {
  messages: [
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
    { id: 111, message: "123" },
  ],

  dialogs: [
    { id: 111, name: "123" },
    { id: 111, name: "123" },
    { id: 111, name: "123" },
    { id: 111, name: "123" },
    { id: 111, name: "123" },
    { id: 111, name: "123" },
    { id: 111, name: "123" },
  ],
};

console.log(testArray.dialogs[1].id);

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 6, message: action.newMessageBody },
        ],
      };

    default:
      return state;
  }
};

export const addMessageActionCreator = (newMessageBody) => ({
  type: ADD_MESSAGE,
  newMessageBody,
});

export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: text,
});

export default dialogsReducer;
