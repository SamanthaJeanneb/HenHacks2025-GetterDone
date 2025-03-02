import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logog from "../assets/logog.png";
import profile from "../assets/profile.png"; // Import profile image

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: "#005c59" }}>
      <Navbar.Brand as={Link} to="/">
        <img
          src={logog}
          height="25"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: "10px" }} // Add margin-left here
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/tasks">
            Tasks
          </Nav.Link>
          <Nav.Link as={Link} to="/calendar">
            Calendar
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            <img
              src={profile}
              height="50"
              width="50"
              className="d-inline-block align-top rounded-circle"
              alt="Profile"
              style={{ marginRight: "10px" }} // Add margin-right here
            />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
