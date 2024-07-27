import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavHeader(props) {
    return (
        <Navbar>
            <Container fluid>
                <Link to="/" className="navbar-brand">
                    TODO LIST
                </Link>
                {props.loggedIn ? (
                    <>
                        <p className="navbar-brand">{props.user}</p>
                        <Button onClick={props.handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </Container>
        </Navbar>
    );
}

export default NavHeader;
