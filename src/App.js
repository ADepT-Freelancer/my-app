import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import Preloader from "./common/preloader/preloader";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import ProfileContainer from "./components/Profile/ProfilleContainer";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/usersContainer";
import "./css/style.css";
import { initializeApp } from "./redux/app-reducer";
import store from "./redux/redux-store";

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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);

let MainApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
