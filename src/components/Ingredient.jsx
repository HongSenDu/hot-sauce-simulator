import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import InfoCard from './InfoCard';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time


const Ingredient = ({ setShowError, setError, tutorialInfo, setTutorialIngredients, processed, data, name, img, index, selected, setSelected, ingredients, setIngredients }) => {
    const [show, setShow] = useState(false);
    const [id, setID] = useState(0);
    const [dragging, setDragging] = useState(false);

    const handleClose = () => setShow(false);

    const onStart = (e) => {
        setSelected(e.target.getAttribute("data-index"))
        setShow(false);
    }

    const handleShow = (e) => {
        setID(e.target.getAttribute("data-index"))
        setShow(true);
    }
    const handleStop = (e) => {
        if (dragging) {
            if (e.toElement.classList.contains("trans")) {
                setShowError(false);
                if (ingredients.some(ingredient => ingredient.name === data[selected].name)) {
                    setError("You already added that ingredient!");
                    setShowError(true);
                } else {
                    setIngredients([...ingredients, data[selected]]);
                    if (tutorialInfo)
                        setTutorialIngredients([...ingredients, data[selected]])
                }
            }
        }
        else {
            setID(e.target.getAttribute("data-index"))
            setShow(true);
        }
        setDragging(false);
        setSelected(-1)
    }

    const onDrag = () => {
        setDragging(true);
    }

    return (
        <>
            <div data-index={index} onClick={(tutorialInfo && !tutorialInfo.object.includes(data[index].name)) ? handleShow : ''} className='w-25 d-inline-block mx-5 my-2'>
                <Card data-index={index} style={{ width: '10rem', border: 'none' }}>
                    <Draggable disabled={processed || (tutorialInfo && !tutorialInfo.object.includes(data[index].name))} position={{ x: 0, y: 0 }} onDrag={onDrag} onStart={onStart} onStop={handleStop}>
                        <Card.Img data-index={index} className="equal" variant="top" src={img} style={{ width: "100%", height: "100%", margin: 'auto', zIndex: 1 }} />
                    </Draggable>
                    <Card.Body data-index={index} className="text-center">
                        <Card.Title data-index={index}>{name}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
            {show && <InfoCard data={data} show={show} handleClose={handleClose} id={id} />}
        </>
    )
}

export default Ingredient;