import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import InfoCard from './InfoCard';


const Tool = ({ tool, ingredients }) => {


    return (
        <>
            <Card className="tool" style={{ width: tool.width, border: 'none' }}>
                <div className="trans" />
                <Card.Img className="tool" variant="top" src={tool.img} style={{ width: "100%", height: "100%", margin: 'auto' }} />
            </Card>
        </>
    )
}

export default Tool;