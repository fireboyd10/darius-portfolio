import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

const heroImages = [require("./images/bg3.webp"), require("./images/bg2.webp"), require("./images/bg1.webp")];

export default function Hero() {
  const { language } = useLanguage();
  const copy = translations[language].hero;

  return (
    <section aria-label={copy.label}>
      <Carousel className="custom-carousel" prevLabel={copy.previous} nextLabel={copy.next} indicatorLabels={copy.indicators}>
        {copy.slides.map((hero, index) => (
          <Carousel.Item key={index}>
            <img src={heroImages[index]} className="d-block w-100" alt="" />
            <Carousel.Caption>
              <h3>{hero.title}</h3>
              <p>{hero.description}</p>
              <a className="buttons" href="https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/">
                {copy.connect}
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
