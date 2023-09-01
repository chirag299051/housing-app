import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Housing App</Navbar.Brand>
        &emsp;
        <Nav className="me-auto">
          <Nav.Link href="" active>
            Rent
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
