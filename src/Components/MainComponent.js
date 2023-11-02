import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainComponent(){
    return(
        <main>
            <Container >
                <Row className="px-4 my-5">
                    {/* dimensions should always add up to 12 */}
                    <Col sm={7}>
                        <Image  
                        src="https://picsum.photos/1000/400?image=1067" 
                        fluid
                        rounded
                        width="400px"
                        />
                    </Col>
                    <Col sm={5}>
                        <h2 class="font-weigh-light">New York</h2>
                        <p class="mt-4"> This is a great city. </p>
                        <Button variant="outline-success">Click here for more information</Button>
                    </Col> 
                </Row>
                <Row>
                    <Card className="text-center bg-secondary text-white my-5 py-4">
                        <Card.Body>Check it out</Card.Body>
                    </Card>
                </Row>
                <Row>
                                            <Col>
                                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://picsum.photos/1000/400?image=43" />
                            <Card.Body>
                                <Card.Title>Looks</Card.Title>
                                <Card.Text>
                                Beautiful
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                    </Col>
                                            <Col>
                                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://picsum.photos/1000/400?image=60" />
                            <Card.Body>
                                <Card.Title>Feels</Card.Title>
                                <Card.Text>
                                Great
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                    </Col>
                    <Col>
                                    <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://picsum.photos/1000/400?image=274" />
                            <Card.Body>
                                <Card.Title>Vibes</Card.Title>
                                <Card.Text>
                                Differently
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}