import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
                <i class="fa-solid fa-people-roof"></i>Home
            </Nav.Link>
            <Nav.Link>
                <i class="fa-solid fa-person-walking"></i>Sign in
            </Nav.Link>
            <Nav.Link>
                <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;