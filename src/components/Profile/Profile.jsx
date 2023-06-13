import React from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {

  return (
    <main className={s.profile__main}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
