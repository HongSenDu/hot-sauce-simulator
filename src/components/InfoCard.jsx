import NavButton from './NavButton';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import ingredients from '../data/ingredients.json';

const InfoCard = ({ data, id, show, handleClose }) => {
    const [ingredient, setIngredient] = useState(data[id])
    return (
        <>
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <div className="p-2" onClick={handleClose}>x</div>
                <Modal.Title className="p-3">{ingredient.name}</Modal.Title>
                <Modal.Body className="text-center">
                    {Array.isArray(ingredient.info) ? ingredient.info.map((elem) => {
                        return elem.name;
                    }).join(", ") : ingredient.info}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default InfoCard;