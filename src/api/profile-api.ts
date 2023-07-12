import { PhotosType, ProfileType } from "../types/types";
import { ResponseTypeAPI, instance } from "./api";

type SavePhotoResponseDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getUserProfile(userId: number) {
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
  updatePhoto(photos: any) {
    return instance
      .put(`/profile/photo/`, {
        data: {
          large: photos,
        },
      })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
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
