import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavButton = ({text, disabled, link, onClick}) => {
    return (
        <Link to={link}>
            <Button disabled={disabled} variant="success" size="lg" onClick={onClick}>
                {text}
            </Button>
        </Link>
    )
}

export default NavButton;