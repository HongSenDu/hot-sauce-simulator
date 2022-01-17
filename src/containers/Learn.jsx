import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';

import Ingredient from '../components/Ingredient';
import Tool from '../components/Tool';
import NavButton from '../components/NavButton';
import EndCard from '../components/EndCard';

import ingredients from '../data/ingredients.json';
import tools from '../data/tools.json';
import results from '../data/results.json';

const Learn = ({ tutorialShow, stepIndex, setStepIndex, setTutorialShow, tutorialInfo, setTutorialIngredients }) => {
    const [data, setData] = useState(ingredients['ingredients']);
    const [ingredientsList, setIngredients] = useState([]);
    const [selected, setSelected] = useState(-1)
    const [toolIndex, setToolIndex] = useState(0);
    const [tool, setTool] = useState(tools["tools"][toolIndex]);
    const [processed, setProcessed] = useState(false);
    const [done, setDone] = useState(false);
    const [show, setShow] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [masterList, setMasterList] = useState([]);

    const checkConditions = () => {
        if (toolIndex == 1 && !ingredientsList.some(ingredient => ingredient.name === "Blend"))
            return false;
        else if (toolIndex == 2 && !ingredientsList.some(ingredient => ingredient.name === "Hot Sauce Liquid"))
            return false;
        return true;
    }

    const handleProcess = () => {
        setShowError(false)
        if (ingredientsList.length > 0 && checkConditions()) {
            if (toolIndex == 2) {
                nextTool();
                setDone(true);
                setShowEnd(true);
            } else {
                let result = results['results'][toolIndex];
                result['info'] = [];
                if (data.some(ingredient => ingredient.name === "Blend")) {
                    ingredientsList.forEach((added) => {
                        if (added.name == "Blend") {
                            result['info'] = result['info'].concat(added.info)
                        } else {
                            result['info'].push(added);
                        }
                    })
                } else {
                    result['info'] = ingredientsList;
                }
                setData([result, ...data]);
            }
            setProcessed(true);
            setShow(true);
            if (tutorialInfo) {
                setStepIndex(stepIndex + 1)
                setTutorialShow(true)
            }
        } else {
            if (toolIndex == 1) {
                setError("You didn't add the blend to the mixer!")
            } else if (toolIndex == 2) {
                setError("You didn't add the liquid to the bottle!")
            }
            setShowError(true)
        }
    }

    const nextTool = () => {
        setMasterList([...masterList, {
            "stage": toolIndex,
            "addedIngredients": ingredientsList
        }])
        let nextIndex = toolIndex + 1
        setProcessed(false);
        setTool(tools['tools'][nextIndex]);
        setToolIndex(nextIndex);
        setIngredients([]);
        if (tutorialInfo) {
            setStepIndex(stepIndex + 1)
            setTutorialShow(true)
        }
    }

    const handleClose = () => setShow(false);

    return (
        <>

            <Row className="pt-0">
                {
                    processed && (
                        <Alert variant={'success'} className="w-100 m-auto text-center">
                            <div>{tool.text}</div>
                        </Alert>
                    )
                }
                {
                    showError && (
                        <Alert variant={'warning'} className="w-100 m-auto text-center">
                            <div>{error}</div>
                        </Alert>
                    )
                }
            </Row>

            <Row className="d-flex py-3 justify-content-between">
                {!tutorialInfo && <div className="px-5"><NavButton text={"Tutorial"} link="/tutorial" className="top-but" /></div>}
                {!tutorialInfo && <div className="px-5"><NavButton text={"Restart"} onClick={() => window.location.reload()} className="top-but" /></div>}
                {tutorialInfo && <div className="px-5"><NavButton text={"Explore"} link="/learn" className="top-but" /></div>}
                {tutorialInfo && <Button variant="success" size="lg" onClick={tutorialShow}>
                    Show Tutorial Step Again
                    </Button>
                }
                <div className="px-5"><NavButton text={"Quiz"} link="/quiz" width="300px" className="top-but" /></div>
            </Row>
            <Row className="pt-1">
                <Col className="equal">
                    {data.slice(0, 6).map((item, index) => {
                        return (item["ingredients"] ? <></> : <><Ingredient setShowError={setShowError} setError={setError} processed={processed} data={data} name={item.name} img={item.img} index={index} selected={selected}
                            tutorialInfo={tutorialInfo} setTutorialIngredients={setTutorialIngredients} setSelected={setSelected} ingredients={ingredientsList} setIngredients={setIngredients} /> {<br></br> && index % 3 == 0}</>)
                    })}
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <div className="top">
                        <b>Ingredients added:</b> {!processed && ingredientsList.map((item) => (item.name)).join(", ")}
                    </div>
                    <Tool processed={processed} tool={tool} ingredients={ingredientsList} /><br></br>
                    <Row className="bot">
                        <Col>
                            {processed && !done ? <NavButton disabled={tutorialInfo && tutorialInfo.disableTool} text="Next" onClick={nextTool} /> : (!done && (
                                <NavButton text={tool['action']} disabled={tutorialInfo && tutorialInfo.disableTool} onClick={handleProcess} />
                            ))}
                            {done && <>
                                {tutorialInfo && <NavButton text={"Restart"} onClick={() => window.location.reload()} className="mx-2 middle-but" />}
                                {<NavButton text={"View Results"} onClick={() => setShowEnd(true)} className="mx-2 middle-but" />}
                            </>}
                        </Col>
                        {showEnd && <EndCard masterList={masterList} setShowEnd={setShowEnd} />}
                    </Row>
                </Col>
                <Col className="equal">
                    {data.slice(6, 12).map((item, index) => {
                        return (<><Ingredient setShowError={setShowError} setError={setError} processed={processed} data={data} name={item.name} img={item.img} index={index + 6} selected={selected}
                            tutorialInfo={tutorialInfo} setTutorialIngredients={setTutorialIngredients} setSelected={setSelected} ingredients={ingredientsList} setIngredients={setIngredients} /> {<br></br> && index % 2 == 1}</>)
                    })}
                </Col>
            </Row>
        </>
    )
}

export default Learn;