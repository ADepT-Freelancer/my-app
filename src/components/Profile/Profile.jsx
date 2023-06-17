import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

  return (
    <main className={s.profile__main}>
      <ProfileInfo 
      
      profile={props.profile} 
      updateStatus={props.updateStatus} 
      status={props.status} 
      
      />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
