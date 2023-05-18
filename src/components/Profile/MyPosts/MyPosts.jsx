import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {

let postsElement = props.posts.map ((p) => <Post post={p.post} likeCounter={p.likeCounter} />)
debugger;

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
    </div>
  );
};

export default MyPosts;
