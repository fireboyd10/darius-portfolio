import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Picture1 from "./images/picture1.webp";
import Picture2 from "./images/picture2.webp";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

export default function About() {
  const { language } = useLanguage();
  const copy = translations[language].about;

  return (
    <section id="about" className="about-block" style={{ marginTop: 0, paddingTop: 0 }}>
      <Container fluid className="px-3 px-md-5">
        <Row className="align-items-center my-5">
          <Col lg={7}>
            <div className="about-card">
              <h2 className="mb-3">{copy.honors}</h2>
              <ul style={{ color: "#fff" }}>
                {copy.awards.map((award, index) => (
                  <li key={index}><strong>{award.title}:</strong> {award.detail}</li>
                ))}
              </ul>

              <div className="about-list mt-4">
                <h5 className="mb-2">{copy.highlights}</h5>
                <ul style={{ color: "#fff" }}>
                  <li><strong>{copy.karate}:</strong> {copy.karateDetail}</li>
                  <li><strong>{copy.seminars}:</strong> {copy.seminarsDetail}</li>
                </ul>
              </div>

              <div className="skills-section mt-4">
                <h5 className="mb-3">{copy.skills}</h5>
                <div className="skills-grid">
                  {copy.skillCards.map((skill, index) => <div className="skill-card" key={index}>{skill}</div>)}
                </div>
              </div>
            </div>
          </Col>

          <Col lg={5} className="text-center">
            <Image src={Picture2} alt={copy.karateAlt} fluid rounded className="pictures" />
          </Col>
        </Row>

        <Row className="align-items-center my-5 flex-lg-row-reverse">
          <Col lg={7}>
            <div className="about-card">
              <h2 className="mb-2">{copy.music}</h2>
              <p className="text-white">{copy.musicDescription}</p>

              <div className="about-grid mt-3">
                <div className="mini-card">
                  <h6 className="mb-1">{copy.whatIDo}</h6>
                  <p className="mb-0">{copy.whatIDoDetail}</p>
                </div>
                <div className="mini-card">
                  <h6 className="mb-1">{copy.collab}</h6>
                  <p className="mb-0">{copy.collabDetail}</p>
                </div>
              </div>

              <a href="https://www.youtube.com/@darius_anc" target="_blank" rel="noreferrer" className="buttons mt-3 d-inline-block">
                {copy.youtube}
              </a>
            </div>
          </Col>

          <Col lg={5} className="text-center">
            <Image src={Picture1} alt={copy.musicAlt} fluid rounded className="pictures" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
