import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  GetStringKeys,
  Textarea,
  createField,
} from "../../../common/FormsControls/FormsControls.tsx";
import {
  maxLengthCreator,
  required,
} from "../../utils/validators/validators.ts";
import Contacts from "./Contacts/Contacts.tsx";
import s from "./MyPosts.module.css";
import Post from "./Post/Post.tsx";
import { PostType } from "../../../types/types.ts";

export type MapPropsPostType = {
  posts: PostType[];
};

export type DispatchPropsPostType = {
  addPost: (newPostBody: string) => void;
};

const MyPosts: React.FC<MapPropsPostType & DispatchPropsPostType> = (props) => {
  let postsElement = props.posts
    .reverse()
    .map((p) => (
      <Post
        key={p.id}
        likeCounter={p.likeCount}
        textButton={p.textButton}
        link={p.link}
        id={p.id}
        title={p.title}
        photo={p.photo}
      />
    ));

  const maxLength30 = maxLengthCreator(30);
  const AddPostForm: React.FC<
    InjectedFormProps<AddPostFormValueType, PropsType> & PropsType
  > = (props) => {
    return (
      <form onSubmit={props.handleSubmit} className={s.button__box}>
        <div className={s.posts__textarea}>
          {createField<AddPostFormValueTypeKeys>(
            "Something new?",
            "newPostBody",
            [required, maxLength30],
            Textarea,
            {}
          )}
        </div>
        <div>
          <button className={s.button}>Send</button>
        </div>
      </form>
    );
  };

  const PostReduxForm = reduxForm({ form: "AddPostFormRedux" })(AddPostForm);

  const onSubmit = (values: AddPostFormValueType) => {
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

const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;

type AddPostFormValueType = {
  newPostBody: string;
};

type PropsType = [];

type AddPostFormValueTypeKeys = GetStringKeys<AddPostFormValueType>;
