import { Container, Row, Col, Image } from 'react-bootstrap';
import NavButton from '../components/NavButton';
import LearnPopup from '../components/LearnPopup';
import React, { useState } from 'react';

const Home = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Container>
            <Row className="text-center my-5">
                <h1 className="m-auto">Welcome to Hot Sauce Simulator</h1>
            </Row>
            <Row className="d-flex justify-content-center my-4">
                <Image src="https://images.sks-bottle.com/images/Hotsauce.jpg" height="350"></Image>
            </Row>
            <Row className="text-center">
                <h5>Learn how different ingredients affect the taste of your hot sauce, how to purchase the best one to suit your preferences, and how to make your own!</h5>
            </Row>

            <Row className="mt-5">
                <Col className="text-center">
                    <NavButton text="Learn" onClick={handleShow} />
                </Col>
                <Col className="text-center">
                    <NavButton link="/quiz" text="Quiz" />
                </Col>
            </Row>
            {show &&
                <div>
                    <LearnPopup show={show} handleClose={handleClose} />
                </div>}
        </Container>
    )
}

export default Home;