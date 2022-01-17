import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import data from '../data/breakdown';

const EndCard = ({ masterList, setShowEnd }) => {
    const [results, setResults] = useState([]);
    const [titles] = useState(["General", "Pan", "Blender", "Bottle", "Advice for next time"])
    const handleClose = () => setShowEnd(false);
    console.log(results)
    const calculateBreakdown = () => {
        let resultsArr = [];
        let general = "";
        let advice = "";
        let seen = {};
        masterList.forEach((stage) => {
            let resultString = ``;
            let stageName = data[`stage ${stage.stage}`];
            stage.addedIngredients.forEach((ing) => {
                console.log(ing)
                let specific = stageName[ing.name]
                let gen = data["general"][ing.name]
                if (specific)
                    resultString += `<p className="py-2"><strong>${ing.name}:</strong> ${specific}</p>`;
                if (gen && !seen[ing.name])
                    general += `<p className="py-2"><strong>${ing.name}:</strong> ${gen}</p>`
                seen[ing.name] = 1
            })
            resultsArr.push(resultString)
            Object.entries(stageName.missing).forEach(([key, value]) => {
                console.log(key)
                if (!seen[key])
                    advice += `<p className="py-2"><strong>${key}: </strong>${value} </p>`
            })
        })
        resultsArr.unshift(general);
        resultsArr.push(advice);
        console.log(advice)
        setResults(resultsArr)
    }

    useEffect(() => {
        calculateBreakdown();
    }, [])

    return (
        <>
            <Modal show={true} onHide={handleClose} className="w-100 d-flex justify-content-center align-items-center">
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center m-auto">Your Breakdown</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {results.map((result, index) => {
                        return (<><h4><u>{titles[index]}</u></h4> {result.length > 0 ? <p dangerouslySetInnerHTML={{ __html: result }} /> : <p className="py-1"> {index == 4 ? "No additional advice!" : "No new ingredients!"} </p>} </>)
                    })}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EndCard;