import React from "react";
import { Modal, Button } from "rsuite";

const LogoutModal = (props) => {
  return (
    <div>
      <>
        <Modal
          open={props.logoutModalOpen}
          onClose={props.handleLogoutClose}
          size="xs"
        >
          <Modal.Header>
            <Modal.Title>Do you really want to logout?</Modal.Title>
            <br/>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={props.handleLogoutSubmission} appearance="primary">
              Confirm
            </Button>
            <Button onClick={props.handleLogoutClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default LogoutModal;
