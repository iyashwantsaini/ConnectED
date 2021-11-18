import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { Dropdown, Grid, Row, Col } from "rsuite";

const ChannelListPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => {
    <Dropdown.Item
      eventKey={activeChannel?.data?.id}
      key={activeChannel?.data?.id}
    >
      # {activeChannel?.data?.name || activeChannel?.data?.id}
    </Dropdown.Item>;
  };

  const DirectPreview = () => {
    const members = Object.values(activeChannel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <Dropdown.Item eventKey={members[0]?.user?.id} key={members[0]?.user?.id}>
        <Grid>
          <Row>
            <Col>
              <Avatar
                image={members[0]?.user?.image}
                name={members[0]?.user?.name}
                size={24}
              />
            </Col>
            <Col>
              <p>{members[0]?.user?.name}</p>
            </Col>
          </Row>
        </Grid>
      </Dropdown.Item>
    );
  };

  return (
    <React.Fragment>
      {/* {channels.map((item, i) => {
                return (
                  <Dropdown.Item eventKey={item._id} key={i}>
                    # {item.channelName}
                  </Dropdown.Item>
                );
              })} */}
      <div
        onClick={() => {
          console.log(activeChannel);
        }}
      >
        {type === "team" ? <ChannelPreview /> : <DirectPreview />}
      </div>
    </React.Fragment>
  );
};

export default ChannelListPreview;
