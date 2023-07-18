import { connect } from "react-redux";
import { actions } from "../../../redux/profile-reducer.ts";
import MyPosts, {
  DispatchPropsPostType,
  MapPropsPostType,
} from "./MyPosts.tsx";
import { AppStateType } from "../../../redux/redux-store.ts";

let f1 = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<
  MapPropsPostType,
  DispatchPropsPostType,
  {},
  AppStateType
>(f1, {
  addPost: actions.addPostActionCreator,
})(MyPosts);

export default MyPostsContainer;
