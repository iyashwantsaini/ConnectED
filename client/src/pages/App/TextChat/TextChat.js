import React from "react";
import { Row, Col } from "rsuite";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

import SideNavChannel from "../../../components/SideNavChannel/SideNavChannel";
import styles from "./TextChat.module.css";
import ChannelContainer from "../../../components/ChannelContainer/ChannelContainer";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;
const client = StreamChat.getInstance(apiKey);
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
  const streamToken = userInfo.stream_token;
  if (streamToken) {
    client.connectUser(
      {
        id: userInfo._id,
        email: userInfo.email,
      },
      streamToken
    );
  }
}

const TextChat = () => {
  return (
    <Chat client={client} theme="team dark">
      <Col lg={5} className={`${styles.channels} ${styles.heightExpand}`}>
        <SideNavChannel />
      </Col>
      <Col
        lg={18}
        className={`${styles.connectionMain} ${styles.heightExpand}`}
      >
        <Row className={styles.heightExpandChats}>
          <ChannelContainer />
        </Row>
      </Col>
    </Chat>
  );
};

export default TextChat;
