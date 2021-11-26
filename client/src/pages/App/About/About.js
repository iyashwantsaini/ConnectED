import React from "react";
import styles from "./About.module.css";
import ThaparIcon from "../../Auth/images/thapar_icon.jpg";

const About = () => {
  return (
    <div class={`${styles.align}`}>
      <div class={`${styles.grid}`}>
        <img src={ThaparIcon} alt="Icon" className={styles.college_icon} />
        <br />
        <br />
        <div class={`${styles.form} ${styles.login}`}>
          ConnectED is a college portal for universities for all internal
          communications. Technologies used in Portal are React.js, Node.js,
          MongoDB, StreamSDK.
        </div>
      </div>
    </div>
  );
};

export default About;
