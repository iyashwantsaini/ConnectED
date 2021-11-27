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
import { Button } from "rsuite";
import OffRoundIcon from "@rsuite/icons/OffRound";
import EditIcon from "@rsuite/icons/Edit";
import { useDispatch } from "react-redux";

import styles from "./ChannelInner.module.css";
import LogoutModal from "../LogoutModal/LogoutModal";
import { USER_LOGOUT } from "../../constants/userConstants";
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
        <div>
          {members.map(({ user }, i) => (
            <div key={i} className={styles.team_channel_header__name_multi}>
              <Avatar
                image={user.image}
                name={user.email || user.id}
                size={32}
              />
              <p
                className={`${styles.team_channel_header__name} ${styles.user}`}
              >
                {user.email || user.id}
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
      <div>
        <p className={`${styles.team_channel_header__name} ${styles.user}`}>
          # {channel.data.name} {"  "}
          <span>
            <EditIcon />
          </span>
        </p>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  };

  const dispatch = useDispatch();

  const handleLogoutSubmission = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    setLogoutModalOpen(false);
    window.location.reload();
  };

  return (
    <div
      className={`${styles.team_channel_header__container} ${styles.team_channel_header__channel_wrapper}`}
    >
      <MessagingHeader />
      <div className={styles.team_channel_header__right}>
        <span className={styles.watcher_count}>
          {getWatcherText(watcher_count)}
        </span>
        <span>
          <Button onClick={handleLogoutOpen}>
            {" "}
            Logout
            <OffRoundIcon />
          </Button>
        </span>
      </div>
      <LogoutModal
        logoutModalOpen={logoutModalOpen}
        handleLogoutClose={handleLogoutClose}
        handleLogoutSubmission={handleLogoutSubmission}
      />
    </div>
  );
};

export default ChannelInner;
