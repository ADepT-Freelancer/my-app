import axios from "axios";
import { UserType } from "../types/types";

export enum ResultCodeEnum {
  success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "d797451f-0da2-4c45-979e-cf3570954901",
  },
});

export type GetItemsType = {
  items: UserType[];
  totalCount: number;
  error: string | null;
};


export type ResponseTypeAPI<D = {}, RC = ResultCodeEnum> = {
  data: D;
  resultCode: RC;
  messages: string[];
};

