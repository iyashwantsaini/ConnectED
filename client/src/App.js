import { CustomProvider } from "rsuite";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Request from "./pages/Auth/Request";
import AppGrid from "./pages/App/AppGrid/AppGrid";
import { userActions } from "./store/userSlice";
import { USER_LOGIN_SUCCESS } from "./constants/userConstants";
import "rsuite/dist/rsuite.min.css";
import "stream-chat-react/dist/css/index.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userSlice.userInfo);

  useEffect(() => {
    const userInfoStorage = localStorage.getItem("userInfo");
    if (userInfoStorage) {
      dispatch(
        userActions.userLogin({
          type: USER_LOGIN_SUCCESS,
          payload: userInfoStorage,
        })
      );
    }
  }, [dispatch]);

  return (
    <CustomProvider theme="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={userInfo ? <AppGrid /> : <Login />}
          ></Route>
          <Route
            exact
            path="/home"
            element={userInfo ? <AppGrid /> : <Login />}
          ></Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <AppGrid /> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={userInfo ? <AppGrid /> : <Register />}
          ></Route>
          <Route
            path="/request"
            element={userInfo ? <AppGrid /> : <Request />}
          ></Route>
        </Routes>
      </Router>
    </CustomProvider>
  );
};

export default App;
