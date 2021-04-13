import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col, Alert } from 'react-bootstrap';

import Ingredient from '../components/Ingredient';
import Tool from '../components/Tool';
import NavButton from '../components/NavButton';

import ingredients from '../data/ingredients.json';
import tools from '../data/tools.json';
import results from '../data/results.json';

const Learn = () => {
    const [data, setData] = useState(ingredients['ingredients']);
    const [ingredientsList, setIngredients] = useState([]);
    const [selected, setSelected] = useState(-1)
    const [toolIndex, setToolIndex] = useState(0);
    const [tool, setTool] = useState(tools["tools"][toolIndex]);
    const [processed, setProcessed] = useState(false);
    const [done, setDone] = useState(false);
    const [show, setShow] = useState(false);

    const handleProcess = () => {
        if (ingredientsList.length > 0) {
            if (toolIndex == 2) {
                nextTool();
                setDone(true)
            } else {
                let result = results['results'][toolIndex];
                result['info'] = ingredientsList;
                setData([result, ...data]);
            }
            setProcessed(true);
            setShow(true);
        }
    }

    const nextTool = () => {
        let nextIndex = toolIndex + 1
        setProcessed(false);
        setTool(tools['tools'][nextIndex]);
        setToolIndex(nextIndex);
        setIngredients([]);
    }

    const handleClose = () => setShow(false);

    return (
        <>
            <Row className="w-100">
                {
                    processed && (
                        <Alert variant={'success'} className="w-100 text-center">
                            <strong>nice!</strong>
                            <div>{tool.text}</div>
                        </Alert>
                    )
                }
            </Row>
            <Row>
                <Col className="equal">
                    {data.slice(0, 6).map((item, index) => {
                        return (item["ingredients"] ? <></> : <><Ingredient processed={processed} data={data} name={item.name} img={item.img} index={index} selected={selected}
                            setSelected={setSelected} ingredients={ingredientsList} setIngredients={setIngredients} /> {<br></br> && index % 3 == 0}</>)
                    })}
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <Tool processed={processed} tool={tool} ingredients={ingredientsList} /><br></br>
                    <div>
                        {!processed && ingredientsList.map((item) => {
                            return (item.name)
                        })}
                    </div>
                    <Row class="p-2">
                        <Col>
                            {processed && !done ? <NavButton text="Next" onClick={nextTool} /> : (!done && (
                                <NavButton text={tool['action']} onClick={handleProcess} />
                            ))}
                        </Col>
                        {done && <><NavButton text={"Restart"} onClick={() => window.location.reload()} />
                            <NavButton text={"Quiz"} link={"/quiz"} /></>}
                    </Row>
                </Col>
                <Col className="equal">
                    {data.slice(6, 12).map((item, index) => {
                        return (<><Ingredient processed={processed} data={data} name={item.name} img={item.img} index={index + 6} selected={selected}
                            setSelected={setSelected} ingredients={ingredientsList} setIngredients={setIngredients} /> {<br></br> && index % 2 == 1}</>)
                    })}
                </Col>
            </Row>
        </>
    )
}

export default Learn;