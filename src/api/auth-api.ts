import {
  ResponseTypeAPI,
  ResultCodeEnum,
  ResultCodeForCaptchaEnum,
  instance,
} from "./api";

type LoginMeResponseDataType = {
  userId: number;
};
type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  me() {
    return instance
      .get<ResponseTypeAPI<MeResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) {
    return instance
      .post<
        ResponseTypeAPI<
          LoginMeResponseDataType,
          ResultCodeEnum | ResultCodeForCaptchaEnum
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
