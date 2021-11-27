import React, { useState } from "react";
import { Channel, MessageTeam } from "stream-chat-react";

import { TeamMessage } from "../TeamMessage/TeamMessage";

import ChannelInner from "../ChannelInner/ChannelInner";
import styles from "./ChannelContainer.module.css";

const ChannelContainer = () => {
  const [pinsOpen, setPinsOpen] = useState(false);

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
        Message={(messageProps, i) => (
          <TeamMessage key={i} {...messageProps} {...{ setPinsOpen }} />
        )}
      >
        <ChannelInner />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
