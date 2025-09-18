import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Picture1 from "./images/picture1.webp";
import Picture2 from "./images/picture2.webp";

export default function About() {
  return (
    <section id="about" className="about-block" style={{ marginTop: 0, paddingTop: 0 }}>
      <Container fluid className="px-3 px-md-5">
        {/* --- Section 1: Honors + Highlights + Skills with Image on Right --- */}
        <Row className="align-items-center my-5">
          <Col lg={7}>
            <div className="about-card">
              <h2 className="mb-3">Honors & Activities</h2>
              <ul style={{ color: "#fff" }}>
                <li><strong>LAMDA Level 2 Award (2021):</strong> Distinction in solo acting performance.</li>
                <li><strong>FIRST Tech Challenge (2022):</strong> Built and presented a robot with Team Hypercube.</li>
                <li><strong>Cisco Networking Academy (2020):</strong> Introduction to Cybersecurity Certificate.</li>
                <li><strong>Google Romania (2019):</strong> Introduction to Computer Science Certificate.</li>
              </ul>

              <div className="about-list mt-4">
                <h5 className="mb-2">Highlights</h5>
                <ul style={{ color: "#fff" }}>
                  <li><strong>Shotokan Karate:</strong> black belt, Vice-World Champion (WSKF 2018, Dublin), multiple national/European medals since 2009.</li>
                  <li><strong>Seminars:</strong> trained with H. Kasuya, H. Kanazawa, T. Naka, K. Kurihara (2017–2022).</li>
                </ul>
              </div>

              <div className="skills-section mt-4">
                <h5 className="mb-3">Skills & Tools</h5>
                <div className="skills-grid">
                  <div className="skill-card">React.js / Next.js</div>
                  <div className="skill-card">JavaScript (ES6+)</div>
                  <div className="skill-card">Python</div>
                  <div className="skill-card">Java (OOP)</div>
                  <div className="skill-card">C / C++ / C#</div>
                  <div className="skill-card">WordPress + CSS/PHP</div>
                  <div className="skill-card">REST APIs</div>
                  <div className="skill-card">Excel & Data handling</div>
                  <div className="skill-card">Cybersecurity Basics (Cisco)</div>
                  <div className="skill-card">Digital Marketing (ECDL)</div>
                  <div className="skill-card">Music Production (FL Studio)</div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={5} className="text-center">
            <Image
              src={Picture2}
              alt="portrait-placeholder-1"
              fluid
              rounded
              className="pictures"
            />
          </Col>
        </Row>

        {/* --- Section 2: Music Production with Image on Left --- */}
        <Row className="align-items-center my-5 flex-lg-row-reverse">
          <Col lg={7}>
            <div className="about-card">
              <h2 className="mb-2">Music Production</h2>
              <p className="text-white">
                I craft Afro-House / Latin-House tracks with melodic hooks and groove-driven rhythms. Music is my creative counterbalance to engineering — structured like code, expressive like design.
              </p>

              <div className="about-grid mt-3">
                <div className="mini-card">
                  <h6 className="mb-1">What I Do</h6>
                  <p className="mb-0">Sound design, arrangement, mixing, artwork direction, short video promos.</p>
                </div>
                <div className="mini-card">
                  <h6 className="mb-1">Collab Ready</h6>
                  <p className="mb-0">Open to label releases, UGC briefs, and custom soundtracks for apps or ads.</p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@darius_anc"
                target="_blank"
                rel="noreferrer"
                className="buttons mt-3 d-inline-block"
              >
                Visit my YouTube Channel
              </a>
            </div>
          </Col>

          <Col lg={5} className="text-center">
            <Image
              src={Picture1}
              alt="portrait-placeholder-2"
              fluid
              rounded
              className="pictures"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
