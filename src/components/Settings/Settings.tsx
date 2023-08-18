import React, { useEffect, useState } from "react";
import "../../css/style.css";
import axios from "axios";

var isTimerGlobal = 1;

type SearchUserType = {
  login: string;
  id: number;
};
type SearchResult = { items: SearchUserType[] };
type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};
export const Settings = () => {
  const initialTimeSeconds = 3;
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [userDetails, setUserDetails] = useState<null | UserType>(null);
  const [seconds, setSeconds] = useState(initialTimeSeconds);
  const [selectUsersChanged, setSelectUsersChanged] = useState(" ");

  return (
    <div className="setting-page__wrapper">
      My different tests
      <div className="search-container">
        <SearchFormInput setUsers={setUsers} />
        <SearchFormUsers
        setSelectUsersChanged={setSelectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
        />
        <UserDetails
        selectUsersChanged={selectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          setSeconds={setSeconds}
          seconds={seconds}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      </div>
    </div>
  );
};
type SearchFormInputType = {
  setUsers: (users: SearchUserType[]) => void;
};
type SearchFormUsersType = {
  setSelectUsersChanged:(selectUsersChanged: string) => void
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setUserDetails: (userDetails: UserType | null) => void;
  users: SearchUserType[];
};
type UserDetailsType = {
  selectUsersChanged: string
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  seconds: number;
  userDetails: null | UserType;
  setUserDetails: (userDetails: null | UserType) => void;
};
const SearchFormInput: React.FC<SearchFormInputType> = (props) => {
  const [tempSearch, setTempSearch] = useState("fuchko");
  const [searchTemp, setSearchTemp] = useState("fuchko");

  useEffect(() => {
    axios
      .get<SearchResult>(`https://api.github.com/search/users?q=${searchTemp}`)
      .then((res) => {
        props.setUsers(res.data.items);
      });
  }, [searchTemp]);
  return (
    <div className="search-form__form">
      <input
        onChange={(e) => setTempSearch(e.currentTarget.value)}
        value={tempSearch}
        placeholder="search"
        title="search-form__input-title"
        className="search-form__input"
        type="text"
      />

      {isTimerGlobal === 0 && "FINISHED"}
      <button
        onClick={() => {
          setSearchTemp(tempSearch);
        }}
        className="search-form__button"
      >
        Find
      </button>
    </div>
  );
};
const SearchFormUsers: React.FC<SearchFormUsersType> = (props) => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
      props.setSelectUsersChanged(selectedUser.login)
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!!selectedUser) {
      isTimerGlobal = 3;

      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => {
          // props.setSeconds(props.initialTimeSeconds);
          props.setUserDetails(res.data);
        });
    }
  }, [selectedUser]);
  return (
    <div className="search-form__users">
      <ul className="users__list">
        {props.users.map((u: SearchUserType) => (
          <li
            key={u.id}
            className={selectedUser === u ? "search-form__selected-user" : ""}
            onClick={() => {
              setSelectedUser(u);
            }}
          >
            {u.login}
          </li>
        ))}
      </ul>
    </div>
  );
};
const UserDetails: React.FC<UserDetailsType> = (props) => {
  const isTimerFinished = () => props.setUserDetails(null);

  return (
    <div className="search-form__about-user">
      {props.userDetails && (
        <div className="about-user__details">
          <Timer
          selectUsersChanged={props.selectUsersChanged}
            initialTimeSeconds={props.initialTimeSeconds}
            setSeconds={props.setSeconds}
            seconds={props.seconds}
            isTimerFinished={isTimerFinished}
          />

          <h2 className="about-user__name"> {props.userDetails.login}</h2>

          <div className="details__avatar-box-ibg">
            <img
              className="details__avatar"
              src={props.userDetails.avatar_url}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

type TimerType = {
  selectUsersChanged: string
  initialTimeSeconds: number;
  isTimerFinished: () => void;
  seconds: number;
  setSeconds: (actualTime: number) => void;
};
const Timer: React.FC<TimerType> = (props) => {
  let [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.seconds === 0 && props.isTimerFinished();
    props.setSeconds(seconds);
    props.seconds === 0 && props.setSeconds(props.initialTimeSeconds);
  }, [seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1); // or we can use: (--seconds)
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.selectUsersChanged]);

  return (
    <div className="timer__wrapper">
      <div className="timer__content">Time left: {seconds}</div>
    </div>
  );
};
