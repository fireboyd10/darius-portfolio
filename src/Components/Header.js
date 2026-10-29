import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const { language, setLanguage } = useLanguage();
  const copy = translations[language].header;

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className="navbar" variant="dark" aria-label={copy.navigation}>
      <Container>
        <Image src={require("./images/darius_logo.webp")} alt={copy.logo} width="100" height="100" className="d-inline-block align-top" />
        <Navbar.Brand>{copy.brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-expanded={expanded} label={copy.toggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="portfolio-nav ms-lg-auto align-items-lg-center">
            <Nav.Link as={Link} to="/">{copy.home}</Nav.Link>
            <Nav.Link as={Link} to="/contact">{copy.more}</Nav.Link>
            <div className="language-control">
              <label htmlFor="website-language" className="visually-hidden">{copy.language}</label>
              <select
                id="website-language"
                className="form-select form-select-sm language-select"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                <option value="en" lang="en">English</option>
                <option value="ro" lang="ro">Română</option>
              </select>
            </div>
            <Dropdown align={{ lg: "end" }} className="cv-download">
              <Dropdown.Toggle variant="outline-light" id="cv-download">{copy.download}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href={`${process.env.PUBLIC_URL}/CV.pdf`} target="_blank" rel="noopener noreferrer" lang="en">
                  CV English (PDF)
                </Dropdown.Item>
                <Dropdown.Item href={`${process.env.PUBLIC_URL}/CV-RO.pdf`} target="_blank" rel="noopener noreferrer" lang="ro">
                  CV Română (PDF)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
