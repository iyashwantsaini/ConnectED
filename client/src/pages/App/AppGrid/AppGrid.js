import React from "react";
import SideNavMain from "../../../components/SideBarMain/SideNavMain";
import { Grid, Row, Col } from "rsuite";
import styles from "./AppGrid.module.css";
import TextChat from "../TextChat/TextChat";

const AppGrid = () => {
  return (
    <React.Fragment>
      <Grid fluid className={styles.heightExpand}>
        <Row className={styles.heightExpand}>
          <Col lg={0.5} className={`${styles.sidemain} ${styles.heightExpand}`}>
            <SideNavMain />
          </Col>
          {/* rendered according to selected in side nav main */}
          <TextChat />
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default AppGrid;
