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
import { initializeApp } from "./redux/app-reducer";
import store, { AppStateType } from "./redux/redux-store";

const DialogsContainer = lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = lazy(
  () => import("./components/Profile/ProfilleContainer")
);
const UsersContainer = lazy(() => import("./components/Users/usersContainer"));

class App extends Component<DispatchPropsType & MapPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log(e);
    debugger;
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
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
                <Route
                  path="/users"
                  element={<UsersContainer pageTitle={"Самураи"} />}
                />
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

type PropsRouter = {
  location: React.Component;
  navigate: React.Component;
  params: React.Component;
};

function withRouter(Component: React.FC<PropsRouter>) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);

let MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};