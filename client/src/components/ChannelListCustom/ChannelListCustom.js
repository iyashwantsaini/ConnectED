import React from "react";
import styles from "./ChannelListCustom.module.css";

const ChannelListCustom = ({ children, error = false, loading, type }) => {
  if (error) {
    return (
      <div className={styles.loading}>Connection Error! Please try again!</div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        {type === "team" ? "Channels " : "Messages"} loading....
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ChannelListCustom;
