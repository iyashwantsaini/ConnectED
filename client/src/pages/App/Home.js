import React, { useState, useEffect } from "react";
import SideNavMain from "../../components/SideBarMain/SideNavMain";
import SideNavChannel from "../../components/SideNavChannel/SideNavChannel";
import TopNav from "../../components/TopNav/TopNav";
import RightBar from "../../components/RightBar/RightBar";
import { Grid, Row, Col } from "rsuite";
import styles from "./Home.module.css";
import ChannelChat from "../../components/ChannelChat/ChannelChat";

const Home = () => {
  // export const logout = () => async (dispatch) => {
  //     localStorage.removeItem("userInfo");
  //     dispatch({ type: USER_LOGOUT });
  //   };

  return (
    <React.Fragment>
      <Grid fluid className={styles.heightExpand}>
        <Row className={styles.heightExpand}>
          <Col lg={0.5} className={`${styles.sidemain} ${styles.heightExpand}`}>
            <SideNavMain />
          </Col>
          <Col lg={3} className={`${styles.channels} ${styles.heightExpand}`}>
            <SideNavChannel />
          </Col>
          <Col
            lg={17}
            className={`${styles.connectionMain} ${styles.heightExpand}`}
          >
            <Row>
              <TopNav />
            </Row>
            <Row className={styles.heightExpandChats}>
              <ChannelChat />
            </Row>
          </Col>
          <Col
            lg={3}
            className={`${styles.infoChannel} ${styles.heightExpand}`}
          >
            <RightBar />
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
