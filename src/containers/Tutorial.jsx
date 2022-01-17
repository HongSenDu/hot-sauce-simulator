
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
                <Modal.Header className="p-0 text-center" closeButton>
                    <Modal.Title className="p-3 m-auto text-center">{steps[stepIndex].title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p dangerouslySetInnerHTML={{ __html: steps[stepIndex].instructions }} />
                </Modal.Body>
            </Modal>
            <Learn tutorialShow={setShow} stepIndex={stepIndex} setTutorialShow={setShow} setStepIndex={setStepIndex} tutorialInfo={steps[stepIndex]} setTutorialIngredients={setTutorialIngredients}></Learn>
        </>
    );
}

export default Tutorial;