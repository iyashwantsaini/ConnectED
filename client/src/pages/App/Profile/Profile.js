import React, { useState } from "react";
import { Button, Input, Message } from "rsuite";
import TagLockIcon from "@rsuite/icons/TagLock";
import axios from "axios";
import { useSelector } from "react-redux";

import styles from "./Profile.module.css";
import ThaparIcon from "../../Auth/images/thapar_icon.jpg";

const Profile = () => {
  const userInfo = JSON.parse(useSelector((state) => state.userSlice.userInfo));
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorPresent, setErrorPresent] = useState(false);
  const [successPresent, setSuccessPresent] = useState(true);

  const [user, setUser] = useState({
    password: "",
    repassword: "",
  });

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
      const { password, repassword } = user;
      if (password && repassword && password === repassword) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/user/profile",
          { ...userInfo, password },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        setSuccessPresent(false);
      } else {
        setErrorPresent(true);
        setSuccessPresent(true);
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
      setErrorMessage(errorVal);
      setErrorPresent(true);
      setSuccessPresent(true);
    }
  };

  return (
    <div class={`${styles.align}`}>
      <div class={`${styles.grid}`}>
        <img src={ThaparIcon} alt="Icon" className={styles.college_icon} />
        <form
          onSubmit={handleSubmission}
          class={`${styles.form} ${styles.login}`}
        >
          <div class={styles.form__field}>
            <label for={styles.login__password}>
              <TagLockIcon />
            </label>
            <Input
              id={styles.login__password}
              type="password"
              name="password"
              class={styles.form__input}
              placeholder="Change Password"
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
              placeholder="Confirm Changed Password"
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
            >
              Update Password
            </Button>
          </div>
        </form>
        <br />
        <Message showIcon type="error" hidden={!errorPresent}>
          {errorMessage}
        </Message>
        <Message showIcon type="success" hidden={successPresent}>
          Success!
        </Message>
      </div>
    </div>
  );
};

export default Profile;
