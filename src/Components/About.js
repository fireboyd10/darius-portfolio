import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
  

export default function About(){
    const family = 50;
    const friends = 20;
    const work = 30;
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const aboutRef = useRef(null);
  
    const scrollToAbout = () => {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <section id="about"  className="about-block">
            <Button className="first_button_about" onClick={scrollToAbout}>About us & Contact</Button>

            <Container className="images_about">
                <Row>
                    <Col><img src="https://picsum.photos/500/300?image=4" alt="imagine 1"/></Col>
                    <Col><img src="https://picsum.photos/500/300?image=22" alt="imagine 2"/></Col>
                </Row>
            </Container>

            <Container fluid ref={aboutRef}>
                <div className="title-holder">
                    <h2>About us</h2>
                </div>
                <div className="subtitle">
                    Learn more about us
                </div>
                    <Row>
                        <Col sm={6}>
                            <Image src="https://picsum.photos/450/350?image=1078" fluid rounded/>
                        </Col>
                        <Col sm={6}>
                            <p>
                                Live a wonderful life, balancing work, family, and friends.
                            </p>
                            <div className="progress-block">
                                <h4>Family</h4>
                                <ProgressBar now={family} label={`${family}%`} />
                                <h4>Friends</h4>
                                <ProgressBar now={friends} label={`${friends}%`} />
                                <h4>Work</h4>
                                <ProgressBar now={work} label={`${work}%`} />
                            </div>
                        </Col>
                    </Row>  
            </Container>
            
        <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Click me to see
        </Button>
        <Overlay target={target.current} show={show} placement="right">
            {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _show,
            popper: _popper,
            hasDoneInitialMeasure: _hasDoneInitialMeasure,
            ...props
            }) => (
            <div
                {...props}
                style={{
                position: 'absolute',
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
                }}
            >
                Hello, world!
            </div>
            )}
        </Overlay>

        </section>
    )

}