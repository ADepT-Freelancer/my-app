import { connect } from "react-redux";
import {
  addPostActionCreator
} from "../../../redux/profile-reducer";
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
      dispatch(addPostActionCreator(newPostBody));
    },
  };
};

const MyPostsContainer = connect(f1, f2)(MyPosts);

export default MyPostsContainer;
