import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api.ts";
import { securityAPI } from "./../api/security-api";
import { authAPI } from "./../api/auth-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";

let initialState = {
  userId: null as null | number,
  login: null as null | string,
  email: null as null | string,
  isFetching: true,
  isAuth: false,
  captchaUrl: null as null | string, //if null , then captcha is not required
};
 
const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
    case "SN/AUTH/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/AUTH/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "SN/AUTH/GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me();

  if (meData.resultCode === ResultCodeEnum.success) {
    let { id, login, email } = meData.data;
    dispatch(actions.setAuthUserData(id, login, email, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean | undefined,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodeEnum.success) {
      dispatch(getAuthUserData());
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }

      let message =
        loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
      let action = stopSubmit("loginFormRedux", { _error: message });
      dispatch(action);
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let res = await securityAPI.getCaptchaUrl();
  const captchaUrl = res.url;

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let res = await authAPI.logout();
  if (res.data.resultCode === ResultCodeEnum.success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | any>;
