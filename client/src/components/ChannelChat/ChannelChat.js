import React from "react";
import styles from "./ChannelChat.module.css";
import { Grid, Col, Row } from "rsuite";
import MessageListing from "./MessageListing/MessageListing";
import MessageInput from "./MessageInput/MessageInput";

const ChannelChat = () => {
  return (
    <React.Fragment>
      <Grid fluid className={styles.channelChatMain}>
        <Col>
          <Row>
            <MessageListing />
          </Row>
          <Row>
            <MessageInput />
          </Row>
        </Col>
      </Grid>
    </React.Fragment>
  );
};

export default ChannelChat;
