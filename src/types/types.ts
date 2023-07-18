export type PostType = {
  id: number;
  title: string | null;
  link: string | null;
  photo: string | null;
  textButton: string | null;
  likeCount: number;
};
export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
  
};
export type ProfileType = {
  userId: number | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string | null;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type LocationType = { city: string | null; country: string | null };

export type UserType = {
  id: number;
  name: string;
  status: string | null;
  photos: PhotosType;
  followed: boolean;
  location: LocationType;
};
