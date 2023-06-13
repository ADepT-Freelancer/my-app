import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import ProfileContainer from "./components/Profile/ProfilleContainer";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/usersContainer";
import "./css/style.css";
import LoginPage from "./components/Login/Login";

const App = () => {
  return (
    <div className="app-wrapper app-wrapper__container">
      <Navbar />
      <HeaderContainer />
      <div className="app-wrapper-content">
        <Routes>

          <Route path="/profile/:userId" element={<ProfileContainer />}></Route>

          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />

          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
