import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import InfoCard from './InfoCard';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time


const Ingredient = ({ processed, data, name, img, index, selected, setSelected, ingredients, setIngredients }) => {
    const [show, setShow] = useState(false);
    const [id, setID] = useState(0);

    const handleShow = (e) => {
        setID(e.target.getAttribute("data-index"))
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const onStart = (e) => {
        console.log(e.position);
        setSelected(e.target.getAttribute("data-index"))
    }

    const handleStop = (e) => {
        console.log(e)
        if (e.toElement.classList.contains("trans")) {
            setIngredients([...ingredients, data[selected]]);
        }
        setSelected(-1)
    }

    return (
        <>
            <div data-index={index} onClick={(e) => handleShow(e)} className='w-25 d-inline-block m-3'>
                <Card data-index={index} style={{ width: '14rem', border: 'none' }}>
                    <Draggable disabled={processed} position={{ x: 0, y: 0 }} onStart={onStart} onStop={handleStop}>
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