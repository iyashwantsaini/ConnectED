import React, { useEffect, useState } from "react";
import styles from "./MessageInput.module.css";
import InputEmoji from "react-input-emoji";

const MessageInput = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(text);
  }, [text]);

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <React.Fragment>
      <div className={styles.messageinput}>
        {/* <Grid>
          <Row>
            <Col>
            <Input as="textarea" rows={3} placeholder="Textarea" />;
            </Col>
            <Col> */}

        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
          borderRadius={5}
          height={100}
        />

        {/* </Col>
          </Row>
        </Grid> */}
      </div>
    </React.Fragment>
  );
};

export default MessageInput;
