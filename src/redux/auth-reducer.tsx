import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum, authAPI, securityAPI } from "../api/api.ts";
import { DispatchType } from "./users-reducer.ts";

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
type SetAuthUserDataPayloadType = {
  myId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  myId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: {
    myId,
    email,
    login,
    isAuth,
  },
});

export type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: {
    captchaUrl: string;
  };
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch: any) => {
  let meData = await authAPI.me();

  if (meData.resultCode === ResultCodeEnum.success) {
    let { id, login, email } = meData.data;
    dispatch(setAuthUserData(id, login, email, true));
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
  let response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
