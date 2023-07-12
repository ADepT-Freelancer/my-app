import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api.ts";
import { securityAPI } from "./../api/security-api";
import { authAPI } from "./../api/auth-api";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";
let initialState = {
  userId: null as null | number,
  login: null as null | string,
  email: null as null | string,
  isFetching: true,
  isAuth: false,
  captchaUrl: null as null | string, //if null , then captcha is not required
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
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
    myId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_USER_DATA,
      payload: { myId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: GET_CAPTCHA_URL_SUCCESS,
      payload: { captchaUrl },
    } as const),
};

export const getAuthUserData = () => async (dispatch: any) => {
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
    captcha: null | undefined
  ) =>
  async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: any) => {
  let res = await securityAPI.getCaptchaUrl();
  const captchaUrl = res.url;

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  let res = await authAPI.logout();
  if (res.data.resultCode === ResultCodeEnum.success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
