import React from "react";
import SideNavMain from "../../../components/SideBarMain/SideNavMain";
import { Grid, Row, Col } from "rsuite";
import styles from "./AppGrid.module.css";
import TextChat from "../TextChat/TextChat";

const AppGrid = () => {
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
          <TextChat />
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default AppGrid;
