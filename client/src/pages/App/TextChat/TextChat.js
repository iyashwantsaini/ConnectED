import React from "react";
import { Row, Col } from "rsuite";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import SideNavChannel from "../../../components/SideNavChannel/SideNavChannel";
// import ChannelChat from "../../../components/ChannelChat/ChannelChat";
import styles from "./TextChat.module.css";
import ChannelContainer from "../../../components/ChannelContainer/ChannelContainer";

const apiKey = "ghaebtv2akna";
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
  console.log(client);

  return (
    <React.Fragment>
      <Chat client={client} theme="team dark">
        <Col lg={4} className={`${styles.channels} ${styles.heightExpand}`}>
          <SideNavChannel />
        </Col>
        <Col
          lg={19}
          // style={{width:"100%"}}
          className={`${styles.connectionMain} ${styles.heightExpand}`}
        >
          {/* <Row>
            <TopNav />
          </Row> */}
          <Row className={styles.heightExpandChats}>
            {/* <ChannelChat /> */}
            <ChannelContainer />
          </Row>
        </Col>
      </Chat>
      {/* <Col lg={3} className={`${styles.infoChannel} ${styles.heightExpand}`}>
        <RightBar />
      </Col> */}
    </React.Fragment>
  );
};

export default TextChat;
