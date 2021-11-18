import React from "react";
import { Row, Col } from "rsuite";

import SideNavChannel from "../../../components/SideNavChannel/SideNavChannel";
import TopNav from "../../../components/TopNav/TopNav";
import RightBar from "../../../components/RightBar/RightBar";
import ChannelChat from "../../../components/ChannelChat/ChannelChat";
import styles from "./TextChat.module.css";

const TextChat = () => {
  return (
    <React.Fragment>
      <Col lg={3} className={`${styles.channels} ${styles.heightExpand}`}>
        <SideNavChannel />
      </Col>
      <Col
        lg={17}
        className={`${styles.connectionMain} ${styles.heightExpand}`}
      >
        <Row>
          <TopNav />
        </Row>
        <Row className={styles.heightExpandChats}>
          <ChannelChat />
        </Row>
      </Col>
      <Col lg={3} className={`${styles.infoChannel} ${styles.heightExpand}`}>
        <RightBar />
      </Col>
    </React.Fragment>
  );
};

export default TextChat;
