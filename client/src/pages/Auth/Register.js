import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Button, IconButton, Form, Input, Nav, Message } from "rsuite";
import EmailIcon from "@rsuite/icons/Email";
import TagLockIcon from "@rsuite/icons/TagLock";
import ThaparIcon from "./images/thapar_icon.jpg";
import PageNextIcon from "@rsuite/icons/PageNext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//add loader
//add messages

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../../constants/userConstants";

const Register = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userSlice);
  const { userInfo, loading, error } = userData;

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    repassword: "",
  });

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
  const handleChangeRePass = (e) => {
    setUser({
      ...user,
      repassword: e,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.userRegister({ type: USER_REGISTER_REQUEST }));
      const { email, password, repassword } = user;
      if (email && password && repassword && password === repassword) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "http://localhost:5000/api/user/register",
          { email, password },
          config
        );

        dispatch(
          userActions.userRegister({
            type: USER_REGISTER_SUCCESS,
            payload: data,
          })
        );
        dispatch(
          userActions.userLogin({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          })
        );

        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/home");
      } else {
        setMessage("Incorrect Inputs!");
      }
    } catch (error) {
      dispatch(
        userActions.userRegister({
          type: USER_REGISTER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

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
                placeholder="College Email"
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
                placeholder="Set Password"
                onChange={handleChangePass}
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
                name="repassword"
                class={styles.form__input}
                placeholder="Confirm Password"
                onChange={handleChangeRePass}
                required
              />
            </div>
            <div class={styles.form__field}>
              <Button
                color="blue"
                appearance="primary"
                className={styles.Login_btn}
                type="submit"
                // onClick={handleSubmission}
              >
                Register
              </Button>
            </div>
          </form>
          <br />
          <Message showIcon type="error">
            Error
          </Message>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
