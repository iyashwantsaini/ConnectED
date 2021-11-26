import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import WavePointIcon from "@rsuite/icons/WavePoint";
// import "./UserList.css";
import styles from "./UserList.module.css";

const ListContainer = ({ children }) => {
  return (
    <div className={styles.user_list__container}>
      <div className={styles.user_list__header}>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className={styles.user_item__wrapper} onClick={handleSelect}>
      <div className={styles.user_item__name_wrapper}>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className={styles.user_item__name}>{user.fullName || user.id}</p>
      </div>
      {selected ? (
        <WavePointIcon />
      ) : (
        <div className={styles.user_item__invite_empty} />
      )}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className={styles.user_list__message}>
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className={styles.user_list__message}>No users found.</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className={styles.user_list__message}>Loading users...</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
