import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
    const navStyle = {
        backgroundColor: '#0077B6',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
    };

    return (
        <Navbar style={navStyle} expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">
                            <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
