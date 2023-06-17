import React from "react";
import { Field, reduxForm } from "redux-form";
import Contacts from "./Contacts/Contacts";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../../../common/FormsControls/FormsControls";

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

  const maxLength30 = maxLengthCreator(30);

  const AddPostForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit} className={s.button__box}>
        <div className={s.posts__textarea}>
          <Field
            placeholder="Something new?"
            component={Textarea}
            name="newPostBody"
            validate={[required, maxLength30]}
          />
        </div>
        <div>
          <button className={s.button}>Send</button>
        </div>
      </form>
    );
  };

  const PostReduxForm = reduxForm({ form: "AddPostFormRedux" })(AddPostForm);

  const onSubmit = (values) => {
    props.addPost(values.newPostBody);
  };
  return (
    <div className={s.postsBlock}>
      <div>My posts</div>

      <PostReduxForm onSubmit={onSubmit} />

      <div className={s.posts}>{postsElement}</div>
      <Contacts />
    </div>
  );
};

export default MyPosts;
