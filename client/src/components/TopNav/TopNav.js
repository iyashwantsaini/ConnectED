import React from "react";
import styles from "./TopNav.module.css";
import { Navbar, Nav, Dropdown } from "rsuite";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">RSUITE</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" icon={<HomeIcon />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Dropdown title="About">
          <Dropdown.Item eventKey="4">Company</Dropdown.Item>
          <Dropdown.Item eventKey="5">Team</Dropdown.Item>
          <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<SettingsIcon />}>Settings</Nav.Item>
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
