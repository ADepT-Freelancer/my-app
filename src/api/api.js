import axios from "axios";

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
  getUserProfile(userId = 2) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
};
export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
};
