import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';

var heroData = [
    {
      id: 1,
      image: require('./images/bg3.jpg'),
      title: 'Welcome!',
      description: '',
      link: 'https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/'
    },
    {
      id: 2,
      image: require('./images/bg2.png'),
      title: 'This is my website!',
      description: 'built using React-Bootstrap and CSS. It showcases my projects, skills, and experiences in the field of computer science, as well as my CV and contact information',
      link: 'https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/'
    },
    {
      id: 3,
      image: require('./images/bg1.png'),
      title: 'Feel free to explore!',
      description: 'You can find more about me and my work in the sections below. If you have any questions or would like to get in touch, please do not hesitate to contact me.',
      link: 'https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/'
    }
 ]

  export default function Hero() {
    return (
      <section>
        <Carousel className="custom-carousel">
          {heroData.map((hero) => (
            <Carousel.Item key={hero.id}>
              <img
                src={hero.image}
                className="d-block w-100"
                alt={"Slide" + hero.id}
              />
              <Carousel.Caption>
                <h3>{hero.title}</h3>
                <p>{hero.description}</p>
                <a className="buttons" href={hero.link}>
                  Let's Connect!
                </a>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    );
  }
  