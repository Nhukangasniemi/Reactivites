import React from "react";
import { Menu, Container, MenuItem, Button } from "semantic-ui-react";

const NavBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <MenuItem>
          <Button positive content="Create Activity" />
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default NavBar;
