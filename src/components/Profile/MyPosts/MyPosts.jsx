import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import Contacts from "./Contacts/Contacts";

const MyPosts = (props) => {
let postsElement = props.posts.map ((p) => 
<Post 
likeCounter={p.likeCounter}  
textButton={p.textButton} 
link={p.link} 
id={p.id} 
title={p.title} 
photo={p.photo}   />)

  return (
    <div className={s.postsBlock}>
      <div>My posts</div>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>

      <div className={s.posts}>
        {postsElement}
      </div>
     <Contacts />
    </div>
  );
};

export default MyPosts;
