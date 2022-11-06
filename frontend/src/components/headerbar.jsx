
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const HeaderBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand> FastTrack </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to='/home' >Home</Nav.Link>
                    <Nav.Link as={Link} to='/applications' >Add Application</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
