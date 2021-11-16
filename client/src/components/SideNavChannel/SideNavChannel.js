import React from "react";
import { Sidenav, Nav, Dropdown } from "rsuite";
import styles from "./SideNavChannel.module.css";
import DashboardIcon from "@rsuite/icons/Dashboard";
import ScatterIcon from "@rsuite/icons/Scatter";
import WavePointIcon from "@rsuite/icons/WavePoint";

const SideNavChannel = () => {
  return (
    <React.Fragment>
      <Sidenav
        defaultOpenKeys={["3", "4"]}
        activeKey="1"
        style={{ height: "100%" }}
      >
        <Sidenav.Body>
          <Nav style={{ paddingTop: 10 }}>
            <Nav.Item
              eventKey="1"
              className={styles.channelListHead}
              icon={<DashboardIcon />}
            >
              ConnectED
            </Nav.Item>
            <Dropdown eventKey="3" title="Channels" icon={<ScatterIcon />}>
              <Dropdown.Item eventKey="3-1"># Events</Dropdown.Item>
              <Dropdown.Item eventKey="3-2"># Hackathons</Dropdown.Item>
              <Dropdown.Item eventKey="3-3"># Placements</Dropdown.Item>
              <Dropdown.Item eventKey="3-4"># Internships</Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey="4"
              title="Direct Messages"
              icon={<WavePointIcon />}
            >
              <Dropdown.Item eventKey="4-1"># Friend1</Dropdown.Item>
              <Dropdown.Item eventKey="4-2"># Friend2</Dropdown.Item>
              <Dropdown.Item eventKey="4-3"># Friend3</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </React.Fragment>
  );
};

export default SideNavChannel;
