import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
 return (
  <header className={s.header}>
   <img src="./favicon.ico" alt="logo" />
  </header>
 );
};



export default Header;
