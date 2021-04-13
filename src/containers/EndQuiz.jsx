import NavButton from '../components/NavButton';
import { Container, Row, Col } from 'react-bootstrap';

const EndQuiz = ({ correctAnswers }) => {
    return (
        <Container>
            <Row className="text-center mt-5">
                <h1 className="m-auto">Congratulations, you got {correctAnswers} questions correct.</h1>
            </Row>

            <Row className="mt-5">
                <Col className="text-center">
                    <NavButton link="/learn" text="Restart Simulator" />
                </Col>
                <Col className="text-center">
                    <NavButton link="/quiz" text="Take the quiz again" />
                </Col>
            </Row>
        </Container>
    )
}

export default EndQuiz;