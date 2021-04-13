import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import InfoCard from './InfoCard';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time


const Ingredient = ({ tutorialInfo, setTutorialIngredients, processed, data, name, img, index, selected, setSelected, ingredients, setIngredients }) => {
    const [show, setShow] = useState(false);
    const [id, setID] = useState(0);

    console.log(tutorialInfo)
    const handleShow = (e) => {
        setID(e.target.getAttribute("data-index"))
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const onStart = (e) => {
        setSelected(e.target.getAttribute("data-index"))
    }

    const handleStop = (e) => {
        if (e.toElement.classList.contains("trans")) {
            setIngredients([...ingredients, data[selected]]);
            if (tutorialInfo)
                setTutorialIngredients([...ingredients, data[selected]])
        }
        setSelected(-1)
    }

    return (
        <>
            <div data-index={index} onClick={(e) => handleShow(e)} className='w-25 d-inline-block m-3'>
                <Card data-index={index} style={{ width: '14rem', border: 'none' }}>
                    <Draggable disabled={processed || (tutorialInfo && !tutorialInfo.object.includes(data[index].name))} position={{ x: 0, y: 0 }} onStart={onStart} onStop={handleStop}>
                        <Card.Img data-index={index} className="equal" variant="top" src={img} style={{ width: "40%", height: "40%", margin: 'auto' }} />
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