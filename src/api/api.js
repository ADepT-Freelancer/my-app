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
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};