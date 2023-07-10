import axios from "axios";
import ProfileType from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "d797451f-0da2-4c45-979e-cf3570954901",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  getUserProfile(userId) {
    console.warn("Obsolete method. Please use profileAPI object");

    return profileAPI.getUserProfile(userId);
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
};

export const profileAPI = {
  getUserProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getUserStatus(userId) {
    return instance.get(`/profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`/profile/status/`, { status: status });
  },
  updatePhoto(photos) {
    return instance.put(`/profile/photo/`, {
      data: {
        large: photos,
      },
    });
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfileData(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodeEnum {
  success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

type LoginMeResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum;
  messages: string[];
};
type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodeEnum;
  messages: string[];
};

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) {
    return instance
      .post<LoginMeResponseType>(`auth/login`, {
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

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
