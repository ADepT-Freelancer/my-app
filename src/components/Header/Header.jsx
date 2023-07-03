/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "../Navbar/Navbar.module.css";

const Header = (props) => {
  let [isMenuOpen, setMenuOpen] = useState(false);

  let menuOpen = () => {
    setMenuOpen(true);
  };
  let menuClose = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 300);
  };

  //=======================================================

  return (
    <header className="header">
      <div className="header__container">
        <NavLink
          to="/profile"
        >
          <a href="#" className="header__logo">
            <img src="./favicon.ico" alt="Logo" />
          </a>
        </NavLink>

        <div class={isMenuOpen && "menu-open"}>
          <nav className=" menu__body">
            <ul>
              <li className={s.item}>
                {props.isAuth && (
                  <div className="header__actions ">
                    <div className="header__button">{props.login} </div>
                  </div>
                )}
              </li>

              <li className={s.item}>
                {props.isAuth || <NavLink to={"/login"}> Login </NavLink>}
              </li>

              <li className={s.item}>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? s.active : undefined
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink
                  to="/dialogs"
                  className={({ isActive }) =>
                    isActive ? s.active : undefined
                  }
                >
                  Messages
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    isActive ? s.active : undefined
                  }
                >
                  News
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink
                  to="/music"
                  className={({ isActive }) =>
                    isActive ? s.active : undefined
                  }
                >
                  Music
                </NavLink>
              </li>

              <li className={s.item}>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? s.active : undefined
                  }
                >
                  Friends
                </NavLink>
              </li>

              <li className={s.item}>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? s.active : undefined
                  }
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <button className="header__button" onClick={props.logout}>
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className={isMenuOpen && "menu-open "}>
          <button
            type="button"
            onClick={menuOpen}
            onBlur={menuClose}
            className="icon-menu"
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
