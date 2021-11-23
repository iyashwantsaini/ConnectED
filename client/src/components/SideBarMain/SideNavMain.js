import React, { useEffect, useState } from "react";
import styles from "./SideNavMain.module.css";
import { Nav } from "rsuite";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useNavigate } from "react-router-dom";
import { USER_LOGOUT } from "../../constants/userConstants";
import { pageActions } from "../../store/pageSlice";
import { useDispatch } from "react-redux";

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
        eventKey="logout"
        icon={<MeetingRoomIcon className={styles.icons} />}
        onClick={props.handleLogoutOpen}
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = React.useState("home");

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  };

  const handleLogoutSubmission = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    setLogoutModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(
      pageActions.togglePage({
        payload: active,
      })
    );
  }, [active, dispatch]);

  return (
    <React.Fragment>
      <CustomNav
        appearance="subtle"
        reversed
        active={active}
        onSelect={setActive}
        handleLogoutOpen={handleLogoutOpen}
      />
      <LogoutModal
        logoutModalOpen={logoutModalOpen}
        handleLogoutClose={handleLogoutClose}
        handleLogoutSubmission={handleLogoutSubmission}
      />
    </React.Fragment>
  );
};

export default SideNavMain;
