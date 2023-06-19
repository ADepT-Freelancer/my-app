import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <main className={s.profile__main}>
      <ProfileInfo
        profile={props.profile}
        contacts={props.contacts}
        updateStatus={props.updateStatus}
        status={props.status}
        photo={props.photo}
      />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
