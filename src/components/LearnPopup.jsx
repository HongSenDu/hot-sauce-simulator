import { Button, Modal } from 'react-bootstrap';
import NavButton from './NavButton';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const LearnPopup = ({ show, handleClose }) => {

    return (
        <>
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Body className="text-center">Woohoo, you're reading this text in a modal!
                    <Row className="mt-5">
                        <Col className="text-center">
                            <NavButton text="Tutorial" link={'/tutorial'} />
                        </Col>
                        <Col className="text-center">
                            <NavButton text="Learn" link={'/learn'} onClick={handleClose} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LearnPopup;