import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import questionsList from '../data/questions';

const Image = styled.img`
    width: 30rem;
`;

const Quiz = ({ correctAnswers, setCorrectAnswers }) => {
    const history = useHistory();
    const [questions] = useState(questionsList['questions'])
    const [question, setQuestion] = useState(0);
    const [selected, setSelected] = useState(-1);
    const [correct, setCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const next = () => {
        if (question + 1 < questions.length) {
            setQuestion(question + 1);
            setSelected(-1);
            setSubmitted(false);
        } else {
            history.push("/quiz-end");
        }
    };

    const submit = () => {
        setCorrect(selected === questions[question].answer);
        if (selected === questions[question].answer) {
            setCorrectAnswers(correctAnswers + 1);
        }
        setSubmitted(true);
    };

    return (
        <Container>
            <Row className="mt-5 px-5 text-center">
                <h2 className="text-center m-auto">Quiz</h2>
            </Row>
            {
                submitted && (
                    <Alert variant={correct ? 'success' : 'danger'}>
                        <strong>{correct ? 'Correct!' : 'Incorrect.'}</strong>
                        <div>{questions[question].explination}</div>
                    </Alert>
                )
            }
            <Row className="mt-5 px-5">
                <Col className="d-flex justify-content-center align-items-center">
                    <Image src={questions[question].img} alt={questions[question]} />
                </Col>
            </Row>
            <Row className="my-5 text-center">
                <h1 className="text-center m-auto">{questions[question].question}</h1>
            </Row>
            <Row className="my-5">
                {
                    questions[question].options.map((option, index) => (
                        <>
                            <Col className="text-center">

                                <Button
                                    className="my-3"
                                    variant="outline-dark"
                                    size="lg"
                                    onClick={() => setSelected(option)}
                                    active={selected === option}
                                >
                                    {option}
                                </Button>
                            </Col>
                        </>
                    ))
                }
            </Row>
            <Row className="mt-5 px-5 d-flex justify-content-center">
                {
                    submitted ? (
                        <Button
                            className="my-3"
                            variant="success"
                            size="lg"
                            onClick={() => next()}
                        >
                            Next Question
                        </Button>
                    ) : (
                        <Button
                            className="my-3"
                            variant="success"
                            size="lg"
                            onClick={() => submit()}
                        >
                            Submit
                        </Button>
                    )
                }
            </Row>
        </Container>
    )
}

export default Quiz;