/* eslint-disable eqeqeq */
import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.jpg";
import styles from "./users.module.css";

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>USERS WILL BE HERE</div>
      <span>Pages:</span>

      <div className={styles.pages}>
        {pages.map((p) => {
          return (
            <span
              onClick={(e) => {
                props.onPageChanged(p);
              }}
              className={props.currentPage === p && styles.selector__page}
            >
              {p}
            </span>
          );
        })}
      </div>
      <div className={styles.users__items}>
        {props.users.map((u) => (
          <div
            key={u.id}
            // className={u.photos.large === null ? styles.display__none : " "}
          >
            <span>
              <div>
                <NavLink to={"/profile/" + u.id}>
                  <img
                    src={u.photos.large != null ? u.photos.large : userPhoto}
                    aria-hidden
                    className={styles.user__photo}
                    alt="Photo Profile"
                  />
                </NavLink>
              </div>
              <div>
                {u.followed ? (
                  <button
                    className={styles.user__button}
                    disabled={props.followingInProgress.some(
                      (id) => id === u.id
                    )}
                    onClick={() => {
                      props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={styles.user__button}
                    disabled={props.followingInProgress.some(
                      (id) => id === u.id
                    )}
                    onClick={() => {
                      props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                {/* <div>Italy</div> */}
                {/* <div>Como</div> */}
                {/* <div>{u.location.country}</div> */}
                {/* <div>{u.location.city}</div> */}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
