import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';

var heroData = [
    {
      id: 1,
      image: require('./images/image1.jpg'),
      title: 'Welcome!',
      description: 'My name is Darius Aniculaesei and I am a third year Computer Science student at TU Dublin',
      link: 'https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/'
    },
    {
      id: 2,
      image: require('./images/image2.jpg'),
      title: 'This is my website!',
      description: 'This website is built using React and Bootstrap. It showcases my projects, skills, and experiences in the field of computer science, as well as my CV and contact information.',
      link: ''
    },
    {
      id: 3,
      image: require('./images/image3.jpg'),
      title: 'Feel free to explore!',
      description: 'You can find more about me and my work in the sections below. If you have any questions or would like to get in touch, please do not hesitate to contact me.',
      link: 'https://www.instagram.com/darius_anc/'
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
                <a className="btn btn-primary" href={hero.link}>
                  Learn more
                </a>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    );
  }
  