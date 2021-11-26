import React from "react";
import { Grid, Row, Col } from "rsuite";
import { useSelector } from "react-redux";

import SideNavMain from "../../../components/SideBarMain/SideNavMain";
import styles from "./AppGrid.module.css";
import TextChat from "../TextChat/TextChat";
import About from "../About/About";
import Profile from "../Profile/Profile";

const AppGrid = () => {
  const pageInfo = useSelector((state) => state.pageSlice.page);
  return (
    <Grid fluid className={styles.heightExpand}>
      <Row className={styles.heightExpand}>
        <Col lg={0.5} className={`${styles.sidemain} ${styles.heightExpand}`}>
          <SideNavMain />
        </Col>
        {pageInfo === "home" && <TextChat />}
        {pageInfo === "about" && <About />}
        {pageInfo === "profile" && <Profile />}
      </Row>
    </Grid>
  );
};

export default AppGrid;
