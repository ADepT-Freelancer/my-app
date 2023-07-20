// import usersReducer, { InitialStateType, actions } from "./users-reducer";

// let state: InitialStateType;

// beforeEach(() => {
//   state = {
//     users: [
//       {
//         id: 0,
//         followed: false,
//         location: { city: "Kharkiv", country: "Ukraine" },
//         name: "Artem",
//         photos: { large: null, small: null },
//         status: "First Id",
//       },
//       {
//         id: 1,
//         followed: false,
//         name: "Diego",
//         status: "I am a boss ",
//         location: { city: "Milan", country: "Italy" },
//         photos: { small: null, large: null },
//       },
//       {
//         id: 2,
//         followed: true,
//         name: "Armani",
//         status: "Hugo boss ",
//         location: { city: "Rome", country: "Italy" },
//         photos: { small: null, large: null },
//       },
//       {
//         id: 3,
//         followed: true,
//         name: "Givangi",
//         status: "Locks at me ",
//         location: { city: "Paris", country: "France" },
//         photos: { small: null, large: null },
//       },
//     ],
//     pageSize: 12,
//     totalCount: 100,
//     currentPage: 1,
//     isFetching: false,
//     followingInProgress: [],
//   };
// });

// test("follow success", () => {
//   const newState = usersReducer(state, actions.followSuccess(1));

//   expect(newState.users[0].followed).toBeFalsy();
//   expect(newState.users[1].followed).toBeTruthy();
// });

// test("unfollow success", () => {
//   const newState = usersReducer(state, actions.unfollowSuccess(3));

//   expect(newState.users[2].followed).toBeTruthy();
//   expect(newState.users[3].followed).toBeFalsy();
// });
