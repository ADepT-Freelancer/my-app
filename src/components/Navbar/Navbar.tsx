import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="menu__open">
      <nav className="menu__body">
        <ul>
          <li className={s.item}>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? s.active : undefined)}
            >
              Profile
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/dialogs"
              className={({ isActive }) => (isActive ? s.active : undefined)}
            >
              Messages
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/news"
              className={({ isActive }) => (isActive ? s.active : undefined)}
            >
              News
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/music"
              className={({ isActive }) => (isActive ? s.active : undefined)}
            >
              Music
            </NavLink>
          </li>

          <li className={s.item}>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? s.active : undefined)}
            >
              Friends
            </NavLink>
          </li>

          <li className={s.item}>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? s.active : undefined)}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
