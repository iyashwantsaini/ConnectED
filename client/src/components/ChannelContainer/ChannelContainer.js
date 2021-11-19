import React from "react";
import {
  Channel,
  MessageTeam,
  MessageList,
  MessageInput,
} from "stream-chat-react";

import ChannelInner from "./ChannelInner/ChannelInner";
import styles from "./ChannelContainer.module.css";

const ChannelContainer = () => {
  const EmptyState = () => (
    <div className={styles.channel_empty__container}>
      <p className={styles.channel_empty__first}>
        This is the beginning of your chat history.
      </p>
      <p className={styles.channel_empty__second}>
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className={styles.channel__container}>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner />
      </Channel>
      {/* <Channel>
        <MessageList />
        <MessageInput />
      </Channel> */}
    </div>
  );
};

export default ChannelContainer;
