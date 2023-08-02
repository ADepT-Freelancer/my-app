/* eslint-disable eqeqeq */
import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.jpg";
import styles from "./users.module.css";
import { UserType } from "../../types/types";

type PropsType = {
  user: UserType;
  followingInProgress: number[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const UserProfile: React.FC<PropsType> = ({
  user,
  followingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <div key={user.id}>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.large != null ? user.photos.large : userPhoto}
              aria-hidden
              className={styles.user__photo}
              alt="Photo Profile"
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              className={styles.user__button}
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={styles.user__button}
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          {/* <div>Italy</div> */}
          {/* <div>Como</div> */}
          {/* <div>{user.location.country}</div> */}
          {/* <div>{user.location.city}</div> */}
        </span>
      </span>
    </div>
  );
};

export default UserProfile;
