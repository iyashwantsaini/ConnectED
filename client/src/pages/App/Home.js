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
      <Grid fluid className={styles.gridformat} >
        <Row >
          <Col xs={0.5} className={styles.sidemain}>
            <SideNavMain />
          </Col>
          <Col xs={3} className={styles.channels}>
            <SideNavChannel />
          </Col>
          <Col xs={25} className={styles.connectionMain}>
            <Row>
              <TopNav />
            </Row>
            <Row>Content</Row>
          </Col>
          <Col xs={3} className={styles.infoChannel}></Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
