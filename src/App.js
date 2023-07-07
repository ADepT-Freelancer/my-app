import React, { Component, Suspense, lazy } from "react";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import Preloader from "./common/preloader/preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Music from "./components/Music/Music";
// import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import "./css/style.css";
import { initializeApp } from "./redux/app-reducer.ts";
import store from "./redux/redux-store.ts";

const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfilleContainer.tsx")
);
const UsersContainer = lazy(() => import("./components/Users/usersContainer.tsx"));

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    console.log(reason);
    debugger

  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    
   }


  render() {
    // if (!this.props.initialized) {
    //   return <Preloader />;
    // }
    return (
      <div className="wrapper wrapper__container">
        {/* <Navbar /> */}
        <HeaderContainer />
        <div className="app-wrapper-content">
          <div className="app-wrapper-content-inside">
            <Suspense
              fallback={
                <div>
                  <Preloader />
                </div>
              }
            >
              <Routes>
                <Route
                  path="/profile/:userId?"
                  element={<ProfileContainer />}
                ></Route>
                <Route path="/dialogs/*" element={<DialogsContainer />} />
                <Route path="/users" element={<UsersContainer pageTitle={"Самураи"}/>} />
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="*" element={<div>404 PAGE NON FOUND</div>} />
              </Routes>
            </Suspense>
          </div>
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
