import React, { useEffect, useState } from "react";
import {
  Sidenav,
  Nav,
  Dropdown,
  Modal,
  ButtonToolbar,
  Button,
  Input,
  Form,
} from "rsuite";
import styles from "./SideNavChannel.module.css";
import DashboardIcon from "@rsuite/icons/Dashboard";
import ScatterIcon from "@rsuite/icons/Scatter";
import WavePointIcon from "@rsuite/icons/WavePoint";
import axios from "axios";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const SideNavChannel = () => {
  const [newChannelOpen, setNewChannelOpen] = useState(false);
  const [channelFormValue, setChannelFormValue] = useState({
    channelName: "",
    channelDescription: "",
  });
  const [channels, setChannels] = useState([]);

  // useEffect(() => {
  //   console.log(channels);
  // }, [channels]);

  useEffect(() => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = axios
        .get("http://localhost:5000/api/text/channel", config)
        .then((result) => {
          // console.log(result.data.result);
          setChannels([...result.data.result]);
        });
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
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/text/channel",
          { channelName, channelDescription },
          config
        );

        setNewChannelOpen(false);

        setChannelFormValue({
          channelName: "",
          channelDescription: "",
        });

        //rerender the channels
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = axios
            .get("http://localhost:5000/api/text/channel", config)
            .then((result) => {
              // console.log(result.data.result);
              setChannels([...result.data.result]);
            });
        } catch (error) {
          //show error msg
          console.log(error);
        }
      } else {
        //show error message
      }
    } catch (error) {
      //show error msg
    }
  };
  const handleNewChannelOpen = () => {
    setNewChannelOpen(true);
  };
  const channelNameChangeHandler = (e) => {
    // console.log(e);
    setChannelFormValue({
      ...channelFormValue,
      channelName: e.target.value,
    });
  };
  const channelDescChangeHandler = (e) => {
    // console.log(e);
    setChannelFormValue({
      ...channelFormValue,
      channelDescription: e.target.value,
    });
  };

  // useEffect(() => {
  //   console.log(channelFormValue);
  // }, [channelFormValue]);

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
                <Button onClick={handleNewChannelOpen}>Add Channel</Button>
              </Dropdown.Item>

              {channels.map((item, i) => {
                return (
                  <Dropdown.Item eventKey={item._id} key={i}>
                    # {item.channelName}
                  </Dropdown.Item>
                );
              })}

              {/* <Dropdown.Item eventKey="3-2"># Hackathons</Dropdown.Item> */}
              {/* <Dropdown.Item eventKey="3-3"># Placements</Dropdown.Item> */}
              {/* <Dropdown.Item eventKey="3-4"># Internships</Dropdown.Item> */}
            </Dropdown>
            <Dropdown
              eventKey="4"
              title="Direct Messages"
              icon={<WavePointIcon />}
            >
              <Dropdown.Item eventKey="4-1"># Friend1</Dropdown.Item>
              <Dropdown.Item eventKey="4-2"># Friend2</Dropdown.Item>
              <Dropdown.Item eventKey="4-3"># Friend3</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>

      <div>
        <Modal open={newChannelOpen} onClose={handleNewChannelClose} size="xs">
          <Modal.Header>
            <Modal.Title>New Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              fluid
              onChange={setChannelFormValue}
              formValue={channelFormValue}
            >
              <Form.Group
                controlId="name-9"
                onChange={channelNameChangeHandler}
              >
                <Form.ControlLabel>Channel Name</Form.ControlLabel>
                <Form.Control name="channelname" />
                <Form.HelpText>Required</Form.HelpText>
              </Form.Group>
              <Form.Group
                controlId="textarea-9"
                onChange={channelDescChangeHandler}
              >
                <Form.ControlLabel>Channel Description</Form.ControlLabel>
                <Form.Control
                  rows={5}
                  name="channeldescription"
                  accepter={Textarea}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleNewChannelSubmission} appearance="primary">
              Confirm
            </Button>
            <Button onClick={handleNewChannelClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default SideNavChannel;
