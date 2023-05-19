import React from "react";
import s from "./Profile.module.css";
import MyPost from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  
  return (
    <main>
      <ProfileInfo />
      <MyPost posts={props.posts} />
    </main>
  );
};

export default Profile;
