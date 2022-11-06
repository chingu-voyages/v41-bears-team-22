import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { HeaderBar } from '../../components/headerbar';
import { Row, Col, Form, DropdownButton, Dropdown, SplitButton, Stack } from 'react-bootstrap'
import { Building, GeoAlt, Calendar, ThreeDotsVertical } from 'react-bootstrap-icons';
import "./home.scss"
//import { ProSidebarProvider } from 'react-pro-sidebar';

export const Home = () => {

    return (
    <div>
        <HeaderBar />
        <Container fluid >
            <Col xs={{ span: 8, offset: 2 }} md={{ span: 8, offset: 2 }}>
                <Row className='header'>
                    <h1> All Applications</h1>
                </Row>

                <Row className="searchContainer">
                    <Col sm={{ span: 9 }} md={{ span: 9 }} >
                        <Form>
                            <Form.Group className="mb-3" controlId="formSearchBar">
                                <Form.Control type="email" placeholder="Search" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={{ span: 3 }} md={{ span: 3 }} className="filterCol">
                        <SplitButton
                            variant="outline-secondary"
                            title="Filter"
                            id="filterDropdown"
                        >
                            {/* Not sure what kind of status option to put here */}
                            <Dropdown.Item href="#">Action</Dropdown.Item>
                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                        </SplitButton>
                    </Col>
                    <p>Applications not updated will be deleted in 24-Hours</p>
                </Row>
                <Row>
                    <Container fluid className='application_card border border-dark shadow-sm p-3 mb-5 bg-white rounded'>
                        <Row>
                            <Col xs={8} md={8} lg={8}>
                                <Row>
                                    <h4 className='cardTitle'>Testing</h4>
                                </Row>
                                <Row>
                                    <Col className="infoBox">
                                        <Stack direction="horizontal" gap={2}>
                                            <Building color='purple' size={50} />
                                            <p className='infoText'>Fairway Indepent Intelligence Service</p>
                                        </Stack>
                                    </Col>
                                    <Col className="infoBox">
                                        <Stack direction="horizontal" gap={2}>
                                            <GeoAlt color="red" size={50} />
                                            <p className='infoText'>Testing</p>
                                        </Stack>
                                    </Col>
                                    <Col className="infoBox">
                                        <Stack direction="horizontal" gap={2}>
                                            <Calendar color="green" size={50} />
                                            <p className="infoText">Testing</p>
                                        </Stack>

                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} md={4} lg={4} className="statusContainer">
                                <Stack direction="horizontal" gap={0}>

                                    <DropdownButton id="statusDropdown" title="Status" variant="dark" size="lg">

                                        {/* Not sure what kind of status option to put here */}
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </DropdownButton>

                                    <ThreeDotsVertical />
                                </Stack>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Col>
        </Container>
    </div>
    );
}
