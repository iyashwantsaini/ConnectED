import React, { useEffect, useState } from "react";
import {
  ChannelList,
  useChatContext,
  ChannelSearch,
  ThemeChannelList,
  ThemeChannelPreview,
} from "stream-chat-react";
import {
  Sidenav,
  Nav,
  Dropdown,
  Modal,
  ButtonToolbar,
  Button,
  Input,
  Form,
  InputGroup,
  Row,
  Col,
} from "rsuite";

import styles from "./SideNavChannel.module.css";
import DashboardIcon from "@rsuite/icons/Dashboard";
import ScatterIcon from "@rsuite/icons/Scatter";
import WavePointIcon from "@rsuite/icons/WavePoint";
import Search from "@rsuite/icons/Search";
import ChannelListCustom from "./ChannelListCustom/ChannelListCustom";
import ChannelListPreview from "./ChannelListPreview/ChannelListPreview";
import ChannelCreateEdit from "./ChannelCreateEdit/ChannelCreateEdit";

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const SideNavChannel = () => {
  const [newChannelOpen, setNewChannelOpen] = useState(false);
  const [channelFormValue, setChannelFormValue] = useState({
    channelName: "",
    channelDescription: "",
  });
  const [channels, setChannels] = useState([]);
  const [channelSearchTerm, setChannelSearchTerm] = useState("");
  const [channelType, setChannelType] = useState("team");

  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);

  const filters = { members: { $in: [client.userID] } };

  useEffect(() => {
    try {
      //fetch channels
    } catch (error) {
      //show error msg
      console.log(error);
    }
  }, []);

  const handleNewChannelClose = () => {
    setNewChannelOpen(false);
  };
  const handleNewChannelSubmission = async () => {
    try {
      const { channelName, channelDescription } = channelFormValue;
      if (channelName && channelDescription) {
        try {
          const newChannel = await client.channel(channelType, channelName, {
            name: channelName,
            description: channelDescription,
            members: selectedUsers,
          });
          await newChannel.watch();
          setSelectedUsers([client.userID]);
          setActiveChannel(newChannel);
        } catch (error) {
          console.log(error);
        }

        setNewChannelOpen(false);

        setChannelFormValue({
          channelName: "",
          channelDescription: "",
        });

        //rerender the channels
      } else {
        //show error message
      }
    } catch (error) {
      //show error msg
    }
  };
  const handleNewChannelOpenDirect = () => {
    setNewChannelOpen(true);
    setChannelType("messaging");
  };
  const handleNewChannelOpenTeam = () => {
    setNewChannelOpen(true);
    setChannelType("team");
  };
  const channelNameChangeHandler = (e) => {
    setChannelFormValue({
      ...channelFormValue,
      channelName: e.target.value,
    });
  };
  const channelDescChangeHandler = (e) => {
    setChannelFormValue({
      ...channelFormValue,
      channelDescription: e.target.value,
    });
  };
  const channelSearchInputHandler = (e) => {
    setChannelSearchTerm(e);
  };
  const channelSearchHandler = async () => {
    try {
      //fetch channels
    } catch (err) {
      //error handling
      setChannelSearchTerm("");
    }
  };

  return (
    <React.Fragment>
      <Sidenav
        defaultOpenKeys={["3", "4"]}
        activeKey="1"
        style={{ height: "100%" }}
      >
        <Sidenav.Body>
          <Nav style={{ paddingTop: 10 }}>
            <Nav.Item
              eventKey="1"
              className={styles.channelListHead}
              icon={<DashboardIcon />}
            >
              ConnectED
            </Nav.Item>
            <Dropdown eventKey="3" title="Channels" icon={<ScatterIcon />}>
              <Dropdown.Item eventKey="3-1">
                <Row>
                  <Col>
                    <InputGroup
                      style={{ width: 180 }}
                      className={styles.searchButton}
                    >
                      <Input onChange={channelSearchInputHandler} />
                      <InputGroup.Button onClick={channelSearchHandler}>
                        <Search />
                      </InputGroup.Button>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Button
                      className={styles.addButton}
                      onClick={handleNewChannelOpenTeam}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Dropdown.Item>
              <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelTeamFilter}
                List={(listProps) => (
                  <ChannelListCustom {...listProps} type="team" />
                )}
                Preview={(previewProps) => (
                  <ChannelListPreview {...previewProps} type="team" />
                )}
              />
            </Dropdown>

            <Dropdown
              eventKey="4"
              title="Direct Messages"
              icon={<WavePointIcon />}
            >
              <Dropdown.Item eventKey="4-1">
                <Row>
                  <Col>
                    <InputGroup
                      style={{ width: 180 }}
                      className={styles.searchButton}
                    >
                      <Input onChange={channelSearchInputHandler} />
                      <InputGroup.Button onClick={channelSearchHandler}>
                        <Search />
                      </InputGroup.Button>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Button
                      className={styles.addButton}
                      onClick={handleNewChannelOpenDirect}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Dropdown.Item>

              <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelMessagingFilter}
                List={(listProps) => (
                  <ChannelListCustom {...listProps} type="messaging" />
                )}
                Preview={(previewProps) => (
                  <ChannelListPreview {...previewProps} type="messaging" />
                )}
              />
            </Dropdown>
            <ChannelCreateEdit
              handleNewChannelClose={handleNewChannelClose}
              handleNewChannelSubmission={handleNewChannelSubmission}
              channelNameChangeHandler={channelNameChangeHandler}
              channelDescChangeHandler={channelDescChangeHandler}
              channelSearchInputHandler={channelSearchInputHandler}
              channelSearchHandler={channelSearchHandler}
              newChannelOpen={newChannelOpen}
              channelFormValue={channelFormValue}
              setSelectedUsers={setSelectedUsers}
            />
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </React.Fragment>
  );
};

export default SideNavChannel;
