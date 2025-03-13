import './Header.css';
import { useSelector } from 'react-redux';
import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
    const favorites = useSelector((state) => state.meals.favorites || []);
    console.log(favorites)

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Test task</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/favorite'}>Favorite : {favorites.length}</Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
