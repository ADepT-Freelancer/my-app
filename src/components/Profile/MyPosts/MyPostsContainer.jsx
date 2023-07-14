import { connect } from "react-redux";
import {
  actions
} from "../../../redux/profile-reducer.ts";
import MyPosts from "./MyPosts";

let f1 = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

let f2 = (dispatch) => {
  return {
    addPost: (newPostBody) => {
      dispatch(actions.addPostActionCreator(newPostBody));
    },
  };
};

const MyPostsContainer = connect(f1, f2)(MyPosts);

export default MyPostsContainer;
