
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Learn from "./Learn";
import data from '../data/tutorial';

const Tutorial = () => {
    const [steps, setSteps] = useState(data['steps']);
    const [stepIndex, setStepIndex] = useState(0);
    const [tutorialIngredients, setTutorialIngredients] = useState([]);
    const [show, setShow] = useState(true);


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    if (steps[stepIndex].object.length > 0) {
        let added = tutorialIngredients.map(obj => obj.name)
        console.log(added)
        if (steps[stepIndex].object.every(val => added.includes(val))) {
            setStepIndex(stepIndex + 1)
            setTutorialIngredients([])
            setShow(true)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Header className="text-center" closeButton>
                    <Modal.Title className="p-3 text-center">{steps[stepIndex].title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {steps[stepIndex].instructions}
                </Modal.Body>
            </Modal>
            <Learn stepIndex={stepIndex} setTutorialShow={setShow} setStepIndex={setStepIndex} tutorialInfo={steps[stepIndex]} setTutorialIngredients={setTutorialIngredients}></Learn>
            <Button variant="success" size="lg" onClick={handleShow}>
                Show Tutorial Step Again
            </Button>
        </>
    );
}

export default Tutorial;