import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Request from "./pages/Auth/Request";
import Home from "./pages/App/Home";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const loginUserHandler = () => {
    console.log("saving user handler triggered");
    setUser({
      email: "yashsn2127@gmail.com",
      password: "weyucvyuiwec",
    });
  };

  return (
    <CustomProvider theme="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? <Home /> : <Login loginUserHandler={loginUserHandler} />
            }
          ></Route>
          <Route
            path="/login"
            element={<Login loginUserHandler={loginUserHandler} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/request" element={<Request />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </CustomProvider>
  );
}

export default App;
