import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Nav } from "rsuite";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";

import { pageActions } from "../../store/pageSlice";
import styles from "./SideNavMain.module.css";

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
        eventKey="about"
        icon={<InfoIcon className={styles.icons} />}
      ></Nav.Item>
    </Nav>
  );
};

const SideNavMain = () => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState("home");
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
      />
    </React.Fragment>
  );
};

export default SideNavMain;
