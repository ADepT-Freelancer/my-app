import { GetItemsType, ResponseTypeAPI, instance } from "./api";
import { profileAPI } from "./profile-api";

export const usersAPI = {
  // async getUsers(
  //   currentPage = 1,
  //   pageSize = 10,
  //   term: string = " ",
  //   friend: null | boolean = null
  // ) {
  //   const res = await instance.get<GetItemsType>(
  //     `users?page=${currentPage}&count=${pageSize}&term=${term}` +
  //       (friend === null ? "" : `&friend=${friend}`)
  //   );
  //   return res.data;
  // },

  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = "",
    friend: null | boolean = null
  ) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
      .then((res) => {
        return res.data;
      });
  },

  getUserProfile(userId: number) {
    console.warn("Obsolete method. Please use profileAPI object");
    return profileAPI.getUserProfile(userId);
  },
  async follow(userId: number) {
    const res = await instance.post<ResponseTypeAPI>(`follow/${userId}`);
    return res.data;
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((res) => res.data) as Promise<ResponseTypeAPI>;
  },
};
