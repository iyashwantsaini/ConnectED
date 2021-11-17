import React, { useEffect } from "react";
import styles from "./TopNav.module.css";
import { Navbar, Nav, Dropdown } from "rsuite";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  const logoutHandler = (e) => {
    console.log(activeKey);
    //logout here
    //remove from storage
    //update state
  };

  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">PageTitle</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1">Home</Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Dropdown title="About">
          <Dropdown.Item eventKey="4">Company</Dropdown.Item>
          <Dropdown.Item eventKey="5">Team</Dropdown.Item>
          <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
        </Dropdown>
      </Nav>
      <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item icon={<SettingsIcon />}></Nav.Item>
        <Nav.Item eventKey="7" onClick={logoutHandler}>
          Logout
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const TopNav = () => {
  const [activeKey, setActiveKey] = React.useState(null);

  return (
    <React.Fragment>
      <NavBarInstance
        appearance="subtle"
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
    </React.Fragment>
  );
};

export default TopNav;
