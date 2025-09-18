import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import Image from "react-bootstrap/Image";

export default function Header(){
    return(
    <Navbar expand="lg" className="navbar" variant="dark">
        <Container>
        <Image src={require('./images/darius_logo.png')} alt="Logo" width="100" height="100" className="d-inline-block align-top" />
        <Navbar.Brand> Online Portfolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">HOME</Nav.Link>
              <Nav.Link as={Link} to="/contact">MORE</Nav.Link>
              <button
                className="btn btn-outline-light ms-3"
                onClick={() => window.open("/CV.pdf", "_blank")}
              >
                Download CV
              </button>

            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>      
    )
}