import React, { useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";
import styles from "./ChannelInner.module.css";

// import { ChannelInfo } from '../assets';
// import InfoRoundIcon from "@rsuite/icons/InfoRound";

export const GiphyContext = React.createContext({});

const ChannelInner = () => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = () => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <div className={styles.team_channel_header__name_wrapper}>
          {members.map(({ user }, i) => (
            <div key={i} className={styles.team_channel_header__name_multi}>
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p
                className={`${styles.team_channel_header__name} ${styles.user}`}
              >
                {user.fullName || user.id}
              </p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className={`${styles.team_channel_header__name} ${styles.user}`}>
              and {additionalMembers} more
            </p>
          )}
        </div>
      );
    }

    return (
      <div className={styles.team_channel_header__channel_wrapper}>
        <p className={styles.team_channel_header__name}>
          # {channel.data.name}
        </p>
        {/* <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
          <InfoRoundIcon />
        </span> */}
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  return (
    <div className={styles.team_channel_header__container}>
      <MessagingHeader />
      <div className={styles.team_channel_header__right}>
        <p className={styles.team_channel_header__right_text}>
          {getWatcherText(watcher_count)}
        </p>
      </div>
    </div>
  );
};

export default ChannelInner;
