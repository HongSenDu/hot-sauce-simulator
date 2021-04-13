import { Modal} from 'react-bootstrap';
import React, { useState } from 'react';

const InfoCard = ({ data, id, show, handleClose }) => {
    const [ingredient] = useState(data[id])

    return (
        <>
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Header closeButton>
                    <Modal.Title className="p-3">{ingredient.name}</Modal.Title>
                </Modal.Header>
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