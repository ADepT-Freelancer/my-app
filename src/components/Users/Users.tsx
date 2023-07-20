/* eslint-disable eqeqeq */
import React from "react";
import Pagination from "../../common/pagination/pagination.tsx";
import UserProfile from "./User.tsx";
import { UserType } from "../../types/types";
import { Formik } from "formik";

let Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,

  pageSize,
  // user,
  followingInProgress,

  unfollow,
  follow,
  users,

  ...props
}) => {
  // let pagesCount = Math.ceil(totalUsersCount / pageSize);
  // let pages = [];
  // for (let i = 1; i <= pagesCount; i++) {
  //   pages.push(i);
  // }

  return (
    <div>
      {/* <UsersSearchForm /> */}
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={pageSize}
        totalItemsCount={totalUsersCount}
      />

      <div className="users__items">
        {users.map((user: UserType) => (
          <UserProfile
            key={user.id}
            user={user}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};

// const UsersSearchForm = () => {
//   return (
//     <div>
//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validate={(values) => {
//           const errors = {};
//           if (!values.email) {
//             errors.email = "Required";
//           } else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//           ) {
//             errors.email = "Invalid email address";
//           }
//           return errors;
//         }}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//         {({ isSubmitting }) => (
          // <Form>
          //   <Field type="email" name="email" />
          //   <ErrorMessage name="email" component="div" />
          //   <Field type="password" name="password" />
          //   <ErrorMessage name="password" component="div" />
          //   <button type="submit" disabled={isSubmitting}>
          //     Submit
          //   </button>
          // </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

export default Users;

type PropsType = {
  isFetching: boolean;
  totalUsersCount: number;
  pageSize: number;
  onPageChanged: (pageNumber: number) => void;

  users: UserType[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;

  followingInProgress: number[];

  currentPage: number;
  // user: UserType[];
  portionSize?: number;
};
