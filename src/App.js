import React, { Component } from "react";
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
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Preloader from "./common/preloader/preloader";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper app-wrapper__container">
        <Navbar />
        <HeaderContainer />
        <div className="app-wrapper-content">
          <Routes>
            <Route
              path="/profile/:userId?"
              element={<ProfileContainer />}
            ></Route>
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
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const mapStateToPropse = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  connect(mapStateToPropse, { initializeApp }),
  withRouter
)(App);
