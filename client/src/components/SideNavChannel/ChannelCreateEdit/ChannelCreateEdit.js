import React from "react";
import { Modal, Form, Button, Input } from "rsuite";
import { useChatContext } from "stream-chat-react";
import UserList from "../../UserList/UserList";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const ChannelCreateEdit = (props) => {
  return (
    <>
      <Modal
        open={props.newChannelOpen}
        onClose={props.handleNewChannelClose}
        size="xs"
      >
        <Modal.Header>
          <Modal.Title>New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={props.setChannelFormValue}
            formValue={props.channelFormValue}
          >
            <Form.Group
              controlId="name-9"
              onChange={props.channelNameChangeHandler}
            >
              <Form.ControlLabel>Channel Name</Form.ControlLabel>
              <Form.Control name="channelname" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group
              controlId="textarea-9"
              onChange={props.channelDescChangeHandler}
            >
              <Form.ControlLabel>Channel Description</Form.ControlLabel>
              <Form.Control
                rows={5}
                name="channeldescription"
                accepter={Textarea}
              />
            </Form.Group>
            <UserList setSelectedUsers={props.setSelectedUsers} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.handleNewChannelSubmission}
            appearance="primary"
          >
            Confirm
          </Button>
          <Button onClick={props.handleNewChannelClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChannelCreateEdit;
