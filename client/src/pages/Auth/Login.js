import React, { useState, useEffect } from "react";
import { Button, Input, Message } from "rsuite";
import EmailIcon from "@rsuite/icons/Email";
import TagLockIcon from "@rsuite/icons/TagLock";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../../constants/userConstants";
import { userActions } from "../../store/userSlice";
import styles from "./Login.module.css";
import ThaparIcon from "./images/thapar_icon.jpg";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorPresent, setErrorPresent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

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
  }, [navigate, dispatch]);

  const handleChangeEmail = (e) => {
    setUser({
      ...user,
      email: e,
    });
  };

  const handleChangePass = (e) => {
    setUser({
      ...user,
      password: e,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setErrorPresent(false);
    try {
      dispatch(userActions.userLogin({ type: USER_LOGIN_REQUEST }));
      const { email, password } = user;
      if (email && password) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/user/login`,
          { email, password },
          config
        );
        dispatch(
          userActions.userLogin({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          })
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        setErrorMessage("Incorrect Inputs!");
      }
    } catch (error) {
      const errorVal =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(
        userActions.userLogin({
          type: USER_LOGIN_FAIL,
          payload: errorVal,
        })
      );
      setErrorMessage(errorVal);
      setErrorPresent(true);
    }
  };

  return (
    <React.Fragment>
      <div class={`${styles.align}`}>
        <div class={`${styles.grid}`}>
          <img src={ThaparIcon} alt="Icon" className={styles.college_icon} />
          <form
            onSubmit={handleSubmission}
            class={`${styles.form} ${styles.login}`}
          >
            <div class={styles.form__field}>
              <label for={styles.login__username}>
                <EmailIcon />
              </label>
              <Input
                autocomplete="email"
                id={styles.login__username}
                type="text"
                name="email"
                class={styles.form__input}
                placeholder="Email"
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div class={styles.form__field}>
              <label for={styles.login__password}>
                <TagLockIcon />
              </label>
              <Input
                id={styles.login__password}
                type="password"
                name="password"
                class={styles.form__input}
                placeholder="Password"
                onChange={handleChangePass}
                required
              />
            </div>
            <div class={styles.form__field}>
              <Button
                color="blue"
                appearance="primary"
                className={styles.Login_btn}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
          <br />
          <p class={`${styles.text__left}`}>
            New Member ? <Link to="/request">Request Access</Link>
          </p>
          <br />
          <Message showIcon type="error" hidden={!errorPresent}>
            {errorMessage}
          </Message>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
