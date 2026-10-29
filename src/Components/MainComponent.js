import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "./images/me1.webp";
import IrispheraImage from "./images/irisphera.webp";
import SynergeticImage from "./images/synergetic.webp";
import SelectMeatImage from "./images/selectmeat.webp";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

const projectAssets = [
  { image: IrispheraImage, link: "https://irisphera.com", label: "irisphera.com" },
  { image: SelectMeatImage },
  { image: SynergeticImage, link: "https://synergeticmind.ro", label: "synergeticmind.ro" },
];

export default function MainComponent() {
  const { language } = useLanguage();
  const copy = translations[language].home;

  return (
    <main className="main-section">
      <Container className="justify-content-center">
        <Row className="px-4 my-5 align-items-center">
          <Col sm={7} className="text-center text-sm-start">
            <Image src={myImage} alt={copy.portraitAlt} fluid rounded width="400px" />
          </Col>
          <Col sm={5}>
            <h2 className="fw-light text-white">{copy.whoami}</h2>
            {language === "ro" ? (
              <>
                <p className="mt-3 text-white">
                  Sunt <strong>Darius Aniculaesei</strong>, student la <strong>Informatică</strong> la
                  <strong> TU Dublin</strong> (2023-2027). Construiesc interfețe clare și scalabile în{" "}
                  <strong>React</strong> și <strong>Next.js</strong>. Îmi place să transform ideile de produs
                  în interfețe rapide și ușor de folosit. Când nu programez, produc muzică House și duc la
                  bun sfârșit proiecte creative.
                </p>
                <p className="text-white">
                  Am încheiat recent un stagiu de șapte luni la <strong>SAP în Dublin</strong>, unde am
                  contribuit la SAP Analytics Cloud și am acumulat experiență practică în dezvoltarea
                  de software enterprise.
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 text-white">
                  I’m <strong>Darius Aniculaesei</strong>, a <strong>Computer Science B.Sc.</strong> student at
                  <strong> TU Dublin</strong> (2023-2027) who builds clean, scalable front-ends in{" "}
                  <strong>React</strong> and <strong>Next.js</strong>. I love turning product ideas into fast, usable
                  interfaces. When I’m not coding, I produce House music and ship creative projects.
                </p>
                <p className="text-white">
                  I recently completed a seven-month internship with <strong>SAP in Dublin</strong>, contributing
                  to SAP Analytics Cloud and gaining hands-on experience in enterprise software development.
                </p>
              </>
            )}
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <section aria-labelledby="latest-experience-heading">
              <h2 id="latest-experience-heading" className="h4 text-white mb-3">{copy.latest}</h2>
              <Card className="experience-card bg-transparent text-white">
                <Card.Body className="p-3 p-md-4">
                  <Card.Title as="h3" className="h4">{copy.sapTitle}</Card.Title>
                  <p className="mb-1">{copy.sapDates}</p>
                  <p className="mb-3">{copy.sapLocation}</p>
                  <ul className="mb-3 ps-3">
                    {copy.sapBullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
                  </ul>
                  <p className="mb-0"><strong>{copy.skills}:</strong> Java · Cloud Computing · SAP HANA · DBeaver · GitHub · Jenkins · CI/CD</p>
                </Card.Body>
              </Card>
            </section>
          </Col>
        </Row>

        <Row>
          <Card className="text-center bg-transparent text-white border-0 my-4 py-3">
            <Card.Body className="px-3">
              <strong>{copy.focus}:</strong> {copy.focusDetails}
            </Card.Body>
          </Card>
        </Row>

        <Row className="text-center g-4">
          {copy.projects.map((project, index) => (
            <Col md key={index}>
              <Card className="bg-transparent text-white border-1" style={{ minHeight: "100%" }}>
                <Card.Img variant="top" src={projectAssets[index].image} alt={project.alt} />
                <Card.Body>
                  <Card.Title className="mb-2">{project.title}</Card.Title>
                  <Card.Text as="div" className="mb-3">
                    <ul className="text-start mb-0" style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
                      {project.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}
                    </ul>
                  </Card.Text>
                  {projectAssets[index].link && (
                    <a href={projectAssets[index].link} target="_blank" rel="noreferrer" className="d-block mb-3 text-white">
                      {projectAssets[index].label}
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-5 g-4">
          {/* Earlier unpublished entry retained: Intern: CCIRI (RO-IL Chamber of Commerce).
              Research for supermarket chains; built an interactive Excel table with locations,
              revenue and product mix. Bucharest, 08-09/2022. */}
          {copy.internships.map((internship, index) => (
            <Col md key={index}>
              <Card className="bg-transparent text-white border-1 h-100">
                <Card.Body>
                  <Card.Title>{internship.title}</Card.Title>
                  <Card.Text className="mb-0">{internship.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-5 g-4">
          <Col lg={7}>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>{copy.educationTitle}</Card.Title>
                {copy.education.map((education, index) => (
                  <Card.Text key={index} className={index === 0 ? "mb-2" : "mb-0"}>
                    <strong>{education.institution}</strong>: {education.description}
                  </Card.Text>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card className="bg-transparent text-white border-1 h-100">
              <Card.Body>
                <Card.Title>{copy.languagesTitle}</Card.Title>
                <Card.Text className="mb-1">
                  {copy.languages.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && " • "}<strong>{item.name}</strong> ({item.level})
                    </React.Fragment>
                  ))}
                </Card.Text>
                <Card.Title className="mt-3">{copy.digitalTitle}</Card.Title>
                <Card.Text className="mb-0">{copy.digitalSkills}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
