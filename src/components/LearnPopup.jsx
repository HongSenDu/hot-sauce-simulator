import { Button, Modal } from 'react-bootstrap';
import NavButton from './NavButton';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const LearnPopup = ({ show, handleClose }) => {

    return (
        <>
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Body className="text-center"> <h5>You are taking the first step in becoming a hot sauce connoisseur! </h5> <br /> This learning module consists of an interactive simulation that allows you to see how ingredients affect the overall taste of hot sauce.
                 <br /><br /> Head to the tutorial for a step by step guide about how to use the simulator. <br /> <br/> If you are confident, click explore to start interacting with the simulator without restrictions right away.
                    <Row className="mt-5">
                        <Col className="text-center">
                            <NavButton text="Tutorial" link={'/tutorial'} />
                        </Col>
                        <Col className="text-center">
                            <NavButton text="Explore" link={'/learn'} onClick={handleClose} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LearnPopup;