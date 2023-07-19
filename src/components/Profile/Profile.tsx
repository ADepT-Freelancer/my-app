import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { InitialStateType } from "../../redux/profile-reducer";
import { ProfileType } from "../../types/types";

type PropsType = {
  profilePage: InitialStateType;
  saveProfileData: (formData: ProfileType) => void;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  isProfileEditMode: boolean;
  setEditMode: () => void;
  status: string;
};
const Profile: React.FC<PropsType> = (props) => {
  return (
    <main className={s.profile__main}>
      <ProfileInfo
        saveProfileData={props.saveProfileData}
        profilePage={props.profilePage}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        isProfileEditMode={props.isProfileEditMode}
        setEditMode={props.setEditMode}
        status={props.status}
      />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
