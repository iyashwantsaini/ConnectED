import React from "react";
import SideNavMain from "../../../components/SideBarMain/SideNavMain";
import { Grid, Row, Col } from "rsuite";
import styles from "./AppGrid.module.css";
import TextChat from "../TextChat/TextChat";
import About from "../About/About";
import Profile from "../Profile/Profile";
import { useSelector } from "react-redux";

const AppGrid = () => {
  const pageInfo = useSelector((state) => state.pageSlice.page);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AppGrid;
