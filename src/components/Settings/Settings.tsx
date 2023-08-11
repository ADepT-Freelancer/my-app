import React, { useEffect, useState } from "react";
import "../../css/style.css";
import axios from "axios";

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
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [tempSearch, setTempSearch] = useState("fuchko");
  const [searchTemp, setSearchTemp] = useState("fuchko");
  const [userDetails, setUserDetails] = useState<null | UserType>(null);

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  useEffect(() => {
    axios
      .get<SearchResult>(`https://api.github.com/search/users?q=${searchTemp}`)
      .then((res) => {
        setUsers(res.data.items);
      });
  }, [searchTemp]);

  useEffect(() => {
    console.log(123);

    if (!!selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => {
          setUserDetails(res.data);
        });
    }
  }, [selectedUser]);

  return (
    <div className="setting-page__wrapper">
      My different tests
      <div className="search-container">
        <SearchFormUsers usersProps={users} selectedUser={selectedUser} />
        <UserDetails userDetailsProps={userDetails} />
      </div>
    </div>
  );
};

const SearchFormInput: React.FC<> = () => {
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
const SearchFormUsers: React.FC<SearchUserType[]> = (
  usersProps,
  selectedUser
) => {
  return (
    <div className="search-form__users">
      <ul className="users__list">
        {usersProps.map((u) => (
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

const UserDetails: React.FC<null | UserType> = (userDetailsProps) => {
  return (
    <div className="search-form__about-user">
      {userDetailsProps && (
        <h2 className="about-user__name"> {userDetailsProps.login}</h2>
      )}
      {userDetailsProps && (
        <div className="about-user__details">
          <div className="details__avatar-box-ibg">
            <img
              className="details__avatar"
              src={userDetailsProps.avatar_url}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};
