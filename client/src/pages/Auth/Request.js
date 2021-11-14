import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Button, IconButton, Form, Input, Uploader } from "rsuite";
import { Icon } from "@rsuite/icons";
import EmailIcon from "@rsuite/icons/Email";
import TagLockIcon from "@rsuite/icons/TagLock";
import ThaparIcon from "./images/thapar_icon.jpg";
import PageNextIcon from "@rsuite/icons/PageNext";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import UserBadgeIcon from "@rsuite/icons/UserBadge";
import ImageIcon from "@rsuite/icons/Image";
import GrowthIcon from "@rsuite/icons/Growth";
import BranchIcon from "@rsuite/icons/Branch";
import { Link } from "react-router-dom";

const Request = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <React.Fragment>
      <div class={`${styles.align}`}>
        <div class={`${styles.grid}`}>
          <img src={ThaparIcon} alt="Icon" className={styles.college_icon} />
          <form class={`${styles.form} ${styles.login}`}>
            <div class={styles.form__field}>
              <label for={styles.login__username}>
                <UserInfoIcon />
              </label>
              <Input
                autocomplete="name"
                id={styles.login__username}
                type="text"
                name="name"
                class={styles.form__input}
                placeholder="Full Name"
                required
              />
            </div>
            <div class={styles.form__field}>
              <label for={styles.login__username}>
                <EmailIcon />
              </label>
              <Input
                autocomplete="email"
                id={styles.login__username}
                type="text"
                name="college_email"
                class={styles.form__input}
                placeholder="College Email"
                required
              />
            </div>
            <div class={styles.form__field}>
              <label for={styles.login__username}>
                <EmailIcon />
              </label>
              <Input
                autocomplete="email"
                id={styles.login__username}
                type="text"
                name="primary_email"
                class={styles.form__input}
                placeholder="Primary Email"
                required
              />
            </div>
            <div class={styles.form__field}>
              <label for={styles.login__username}>
                <GrowthIcon />
              </label>
              <Input
                autocomplete="year"
                id={styles.login__username}
                type="text"
                name="batch"
                class={styles.form__input}
                placeholder="Batch (eg. 2022)"
                required
              />
            </div>
            <div class={styles.form__field}>
              <label for={styles.login__username}>
                <BranchIcon />
              </label>
              <Input
                autocomplete="year"
                id={styles.login__username}
                type="text"
                name="branch"
                class={styles.form__input}
                placeholder="Branch (eg. Computer Engineering)"
                required
              />
            </div>
            <div class={styles.form__field}>
              <>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="select-image">
                  <div variant="contained" color="primary" component="span">
                    Upload College ID Card
                  </div>
                </label>
                {imageUrl && selectedImage && (
                  <div mt={2} textAlign="center">
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="100px"
                    />
                  </div>
                )}
              </>
            </div>
            <div class={styles.form__field}>
              <Button
                color="blue"
                appearance="primary"
                className={styles.Login_btn}
              >
                Request Access
              </Button>
            </div>
          </form>
          <br />
          <p class={`${styles.text__left}`}>
            Have Access ? <Link to="/login">Login</Link>
          </p>
          <br />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Request;
