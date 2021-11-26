import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { Dropdown, Grid, Row, Col } from "rsuite";

const ChannelListPreview = ({ setActiveChannel, channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <Dropdown.Item eventKey={channel?.data?.id} key={channel?.data?.id}>
      # {channel?.data?.name || channel?.data?.id}
    </Dropdown.Item>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <Dropdown.Item eventKey={members[0]?.user?.id} key={members[0]?.user?.id}>
        <Grid>
          <Row>
            <Col>
              <Avatar
                image={members[0]?.user?.image}
                name={members[0]?.user?.email}
                size={24}
              />
            </Col>
            <Col>
              <p>{members[0]?.user?.email}</p>
            </Col>
          </Row>
        </Grid>
      </Dropdown.Item>
    );
  };

  return (
    <React.Fragment>
      <div
        onClick={() => {
          console.log(channel);
          setActiveChannel(channel);
        }}
      >
        {type === "team" ? <ChannelPreview /> : <DirectPreview />}
      </div>
    </React.Fragment>
  );
};

export default ChannelListPreview;
