import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "../Components/images/me1.webp";
import IrispheraImage from "../Components/images/irisphera.webp";
import SynergeticImage from "../Components/images/synergetic.webp";
import SelectMeatImage from "../Components/images/selectmeat.webp";

export default function MainComponent() {
  return (
    <main className="main-section">
      <Container className="justify-content-center">
        <Row className="px-4 my-5 align-items-center">
          <Col sm={7} className="text-center text-sm-start">
            <Image src={myImage} fluid rounded width="400px" />
          </Col>
          <Col sm={5}>
            <h2 className="fw-light text-white">Whoami</h2>
            <p className="mt-3 text-white">
              I’m <strong>Darius Aniculaesei</strong>, a <strong>Computer Science B.Sc.</strong> student at
              <strong> TU Dublin</strong> (2023–2027) who builds clean, scalable front-ends in{" "}
              <strong>React</strong> and <strong>Next.js</strong>. I love turning product ideas into fast, usable
              interfaces—and when I’m not coding, I produce House music and ship creative projects.
            </p>
          </Col>
        </Row>

        <Row>
          <Card className="text-center bg-transparent text-white border-0 my-4 py-3">
            <Card.Body className="px-3">
              <strong>Front-End Focus:</strong> React • Next.js • REST API integration • UI/UX details •
              WordPress (custom CSS/PHP) • Clean, maintainable code
            </Card.Body>
          </Card>
        </Row>

        <Row className="text-center g-4">
          <Col md>
            <Card className="bg-transparent text-white border-1" style={{ minHeight: "100%" }}>
              <Card.Img variant="top" src={IrispheraImage} />
              <Card.Body>
                <Card.Title className="mb-2">Irisphera — Virtual Stylist</Card.Title>
                <Card.Text className="mb-3">
                  <ul className="text-start mb-0" style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
                    <li>Front-End Developer (React/Next.js)</li>
                    <li>Built interactive mannequin slides (eyes, size, colors, measurements)</li>
                    <li>Implemented loading screen + account/settings UI</li>
                  </ul>
                </Card.Text>
                <a href="https://irisphera.com" target="_blank" rel="noreferrer" className="d-block mb-3 text-white">
                  irisphera.com
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col md>
            <Card className="bg-transparent text-white border-1" style={{ minHeight: "100%" }}>
              <Card.Img variant="top" src={SelectMeatImage} />
              <Card.Body>
                <Card.Title className="mb-2">Meat Ordering Platform — Marketplace UI</Card.Title>
                <Card.Text className="mb-3">
                  <ul className="text-start mb-0" style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
                    <li>Front-end built from scratch (React/Next.js)</li>
                    <li>API integration for products, prices, descriptions</li>
                    <li>Dynamic lists, filters, and detail views</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md>
            <Card className="bg-transparent text-white border-1" style={{ minHeight: "100%" }}>
              <Card.Img variant="top" src={SynergeticImage} />
              <Card.Body>
                <Card.Title className="mb-2">SynergeticMind — Membership Platform</Card.Title>
                <Card.Text className="mb-3">
                  <ul className="text-start mb-0" style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
                    <li>WordPress + custom CSS/PHP</li>
                    <li>Paid video courses & downloadable content</li>
                    <li>Full auth, user areas, and content management</li>
                  </ul>
                </Card.Text>
                <a href="https://synergeticmind.ro" target="_blank" rel="noreferrer" className="d-block mb-3 text-white">
                  synergeticmind.ro
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5 g-4">
          {/* <Col md>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>Intern — CCIRI (RO-IL Chamber of Commerce)</Card.Title>
                <Card.Text className="mb-0">
                  Research for supermarket chains; built an interactive Excel table with locations, revenue,
                  product mix. Bucharest, 08–09/2022.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>Intern — iSTYLE (Apple Premium Reseller)</Card.Title>
                <Card.Text className="mb-0">
                  Customer support, device service assistance, tech vocabulary; handled EN/DE/FR clients; learned
                  retail ops & basic finance. 07–08/2022.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>Intern — Trady 2000</Card.Title>
                <Card.Text className="mb-0">
                  Designed DB solutions, improved website, configured PCs. 09–10/2022.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5 g-4">
          <Col lg={7}>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>Education</Card.Title>
                <Card.Text className="mb-2">
                  <strong>Technological University Dublin</strong> — B.Sc. Computer Science (2023–2027), Dublin, IE
                </Card.Text>
                <Card.Text className="mb-0">
                  <strong>Laude-Reut Educational Complex</strong> — Romanian Baccalaureate (Math-Informatics, EN
                  Bilingual), Bucharest, RO
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>Languages</Card.Title>
                <Card.Text className="mb-1">
                  <strong>Romanian</strong> (native) • <strong>English</strong> (C2/C1) • <strong>German</strong> (B2/C1) •{" "}
                  <strong>French</strong> (B1/B2) • <strong>Hebrew</strong> (A1)
                </Card.Text>
                <Card.Title className="mt-3">Digital Skills</Card.Title>
                <Card.Text className="mb-0">
                  React, Next.js, HTML/CSS/JS, APIs, WP (CSS/PHP), C/C++/C#, Microsoft 365; ECDL: Digital Marketing,
                  IT Security, BAC Profile; Music Production.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
