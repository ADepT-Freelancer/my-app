import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import Contacts from "./Contacts/Contacts";


const MyPosts = (props) => {
  let postsElement = props.posts.map((p) => (
    <Post
      likeCounter={p.likeCounter}
      textButton={p.textButton}
      link={p.link}
      id={p.id}
      title={p.title}
      photo={p.photo}
    />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
props.updateNewPostText(text);
    
  };

  return (
    <div className={s.postsBlock}>
      <div>My posts</div>
      <div>
        <div>
          <textarea
            placeholder="Something new?"
            onChange={onPostChange}
            value={props.newPostText}
            ref={newPostElement}
          />
        </div>
        <div className={s.button__box}>
          <button className={s.button} onClick={onAddPost}>
            Add post
          </button>
        </div>
      </div>

      <div className={s.posts}>{postsElement}</div>
      <Contacts />
    </div>
  );
};

export default MyPosts;
