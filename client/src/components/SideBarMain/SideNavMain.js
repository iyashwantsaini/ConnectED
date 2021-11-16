import React from "react";
import styles from "./SideNavMain.module.css";
import { Nav } from "rsuite";
import Profile from "../../pages/App/Profile/Profile";
import Home from "../../pages/App/Home";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav
      {...props}
      vertical
      activeKey={active}
      onSelect={onSelect}
      style={{ height: "100%" }}
    >
      <Nav.Item
        className={styles.iconsShell}
        eventKey="home"
        icon={<HomeIcon className={`${styles.icons} ${styles.iconHome}`} />}
      ></Nav.Item>
      <Nav.Item
        className={styles.iconsShell}
        eventKey="profile"
        icon={<AccountCircleIcon className={styles.icons} />}
      ></Nav.Item>
      <Nav.Item
        className={styles.iconsShell}
        eventKey="textchannels"
        icon={<TextFieldsIcon className={styles.icons} />}
      ></Nav.Item>
      <Nav.Item
        className={styles.iconsShell}
        eventKey="voicechannels"
        icon={<RecordVoiceOverIcon className={styles.icons} />}
      ></Nav.Item>
      <Nav.Item
        className={styles.iconsShell}
        eventKey="about"
        icon={<InfoIcon className={styles.icons} />}
      ></Nav.Item>
    </Nav>
  );
};

const SideNavMain = () => {
  const [active, setActive] = React.useState("home");
  return (
    <React.Fragment>
      <CustomNav
        appearance="subtle"
        reversed
        active={active}
        onSelect={setActive}
      />
    </React.Fragment>
  );
};

export default SideNavMain;
