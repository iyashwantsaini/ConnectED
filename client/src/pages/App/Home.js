import React, { useState, useEffect } from "react";
import SideNavMain from "../../components/SideBarMain/SideNavMain";
import SideNavChannel from "../../components/SideNavChannel/SideNavChannel";
import TopNav from "../../components/TopNav/TopNav";
import { Grid, Row, Col } from "rsuite";
import styles from "./Home.module.css";

const Home = () => {
  // export const logout = () => async (dispatch) => {
  //     localStorage.removeItem("userInfo");
  //     dispatch({ type: USER_LOGOUT });
  //   };

  return (
    <React.Fragment>
      <Grid fluid className={styles.heightExpand}>
        <Row className={styles.heightExpand}>
          <Col xs={0.5} className={`${styles.sidemain} ${styles.heightExpand}`}>
            <SideNavMain />
          </Col>
          <Col xs={3} className={`${styles.channels} ${styles.heightExpand}`}>
            <SideNavChannel />
          </Col>
          <Col
            xs={25}
            className={`${styles.connectionMain} ${styles.heightExpand}`}
          >
            <Row>
              <TopNav />
            </Row>
            <Row>Content</Row>
          </Col>
          <Col
            xs={3}
            className={`${styles.infoChannel} ${styles.heightExpand}`}
          ></Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
