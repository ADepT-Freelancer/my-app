import { InferActionsTypes } from "./redux-store";

let initialState = {
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

export const actions = {
  addMessageActionCreator: (newMessageBody: string) => ({
    type: "SN/DIALOGS/ADD-MESSAGE",
    newMessageBody,
  }),

  updateNewMessageTextActionCreator: (text: string) => ({
    type: "SN/DIALOGS/UPDATE-NEW-MESSAGE-TEXT",
    newText: text,
  }),
};
let i = 6;
const dialogsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "SN/DIALOGS/ADD-MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: i++, message: action.newMessageBody },
        ],
      };

    default:
      return state;
  }
};

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
