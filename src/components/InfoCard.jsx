import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';

const InfoCard = ({ data, id, show, handleClose }) => {
    const [ingredient] = useState(data[id])
    console.log(ingredient)
    return (
        <>
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Header className="m-auto" closeButton>
                    <Modal.Title className="">{ingredient.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    {Array.isArray(ingredient.info) ? "This item consists of " + ingredient.info.map((elem) => {
                        return elem.name;
                    }).join(", ") : <>
                        <p><b>Taste:</b> <span dangerouslySetInnerHTML={{ __html: ingredient.taste }} /></p>
                        <p><b>Use:</b>  <span dangerouslySetInnerHTML={{ __html: ingredient.use }} /></p>
                        <p dangerouslySetInnerHTML={{ __html: ingredient.misc }} />
                    </>}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default InfoCard;