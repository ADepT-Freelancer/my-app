import { PhotosType, ProfileType } from "../types/types";
import { ResponseTypeAPI, instance } from "./api";

export const profileAPI = {
  getUserProfile(userId: number) {
    debugger;
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((res) => res.data);
  },
  getUserStatus(userId: number) {
    return instance
      .get<string>(`/profile/status/${userId}`)
      .then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance
      .put<ResponseTypeAPI>(`/profile/status/`, { status: status })
      .then((res) => res.data);
  },
  updatePhoto(photos: File) {
    return instance
      .put(`/profile/photo/`, {
        data: {
          large: photos,
        },
      })
      .then((res) => res.data);
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<ResponseTypeAPI<SavePhotoResponseDataType>>(
        `profile/photo/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data);
  },
  saveProfileData(profile: ProfileType) {
    return instance
      .put<ResponseTypeAPI>(`profile`, profile)
      .then((res) => res.data);
  },
};

type SavePhotoResponseDataType = {
  photos: PhotosType;
};
