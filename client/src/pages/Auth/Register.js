import React, { useState, useEffect } from "react";
import { Button, Input, Message } from "rsuite";
import EmailIcon from "@rsuite/icons/Email";
import TagLockIcon from "@rsuite/icons/TagLock";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import styles from "./Register.module.css";
import ThaparIcon from "./images/thapar_icon.jpg";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorPresent, setErrorPresent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const [user, setUser] = useState({
    email: "",
    password: "",
    repassword: "",
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
  const handleChangeRePass = (e) => {
    setUser({
      ...user,
      repassword: e,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setErrorPresent(false);
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
      } else {
        setErrorPresent(true);
        if (password !== repassword) {
          setErrorMessage("Password and Confirm Password must be same!");
        } else {
          setErrorMessage("Incorrect Inputs!");
        }
      }
    } catch (error) {
      const errorVal =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(
        userActions.userRegister({
          type: USER_REGISTER_FAIL,
          payload: errorVal,
        })
      );
      setErrorMessage(errorVal);
      setErrorPresent(true);
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
          <Message showIcon type="error" hidden={!errorPresent}>
            {errorMessage}
          </Message>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
