import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function About(){
    const family = 50;
    const friends = 20;
    const work = 30;
    return (
        <section id="about"  className="about-block">
            <Container fluid>
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
        </section>
    )

}