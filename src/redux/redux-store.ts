import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.tsx";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.tsx";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer.ts";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer; //(globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

export type PropertiesTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<PropertiesTypes<T>>;

// @ts-ignore
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunkMiddleware))
);
// @ts-ignore
window.__store__ = store;

export default store;
