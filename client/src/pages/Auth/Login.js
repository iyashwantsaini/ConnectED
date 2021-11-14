import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Button, IconButton, Form, Input, Nav } from "rsuite";
import EmailIcon from "@rsuite/icons/Email";
import TagLockIcon from "@rsuite/icons/TagLock";
import ThaparIcon from "./images/thapar_icon.jpg";
import PageNextIcon from "@rsuite/icons/PageNext";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
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

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <React.Fragment>
      <div class={`${styles.align}`}>
        <div class={`${styles.grid}`}>
          <img src={ThaparIcon} alt="Icon" className={styles.college_icon} />
          <form class={`${styles.form} ${styles.login}`}>
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
                // type="submit"
              >
                Login
              </Button>
            </div>
          </form>
          <br />
          <p class={`${styles.text__left}`}>
            Have Access ? <a to="/">Setup Account</a>
            <br />
            New Member ? <a to="/">Request Access</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
