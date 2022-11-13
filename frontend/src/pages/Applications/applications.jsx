import React, { useState } from 'react';
import { HeaderBar } from '../../components/headerbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Row, Form, Container, Button, Dropdown, DropdownButton, Stack } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./applications.scss"

export const Applications = () => {

    const [jobTitle, setJobTitle] = useState('');
    // const [companyName, setCompanyName] = useState('');
    const [applicationDate, setAppDate] = useState(new Date());
    const [contactDate, setContactDate] = useState(new Date());


    return (
        <div>
            <HeaderBar />
            <div className="container">
                {/* <Row>
                    <Col>
                        <h1 className='title'>Add Application</h1>
                    </Col>
                </Row> */}
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="tab-container mb-3"
                >
                    <Tab eventKey="Jobs" title="Jobs">
                        <p> Sample Text What's a personal statement, and why do you need one when you're job searching? A job search personal statement is a place to share why you're interested in a position and why you're a good match.</p>
                        <Container fluid className="shadow-sm p-3 mb-5 rounded form-container application-container-color">
                            <Form>
                                <Row>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Job Title</Form.Label>
                                        <Form.Control />

                                    </Col>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Job Description Url</Form.Label>
                                        <Form.Control type="text" id="inputJobDescrip" placeholder='https://' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Company Name</Form.Label>
                                        <Form.Control type="text" id="inputJobDescrip" />
                                    </Col>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Location</Form.Label>
                                        <Form.Control type="text" id="inputJobDescrip" />
                                    </Col>
                                    <Col xs={2} className='form-box'>
                                        <Form.Label className='form-label'>Application Date</Form.Label>
                                        <DatePicker className="date-picker" selected={applicationDate} onChange={(date) => setAppDate(date)} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className='form-box'>Notes</Form.Label>
                                        <Form.Control as="textarea" rows={4} />
                                    </Form.Group>
                                </Row>

                                <Row className='buttonContainer' >
                                    <Col xs={{ span: 2, offset: 5 }}>
                                        <Button className="submitButton" variant="sucess" size="lg" >Add Job</Button>{""}
                                    </Col>
                                </Row>

                            </Form>
                        </Container>
                    </Tab>
                    <Tab eventKey="Contacts" title="Contacts">

                        <Container fluid className="shadow-sm p-3 mb-5 rounded form-container contact-container-color">
                            <Form>
                                <Row>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Date of networking activity</Form.Label>
                                        <DatePicker className="date-picker" selected={contactDate} onChange={(date) => setContactDate(date)} />
                                    </Col>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Name of contact</Form.Label>
                                        <Form.Control type="text" id="inputContactName" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Job title/profession </Form.Label>
                                        <Form.Text className="fst-italic italics-margin text-black" >
                                            (optional)
                                        </Form.Text>
                                        <Form.Control type="text" id="inputContactJobTitle" />
                                    </Col>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Company </Form.Label>
                                        <Form.Text className="fst-italic italics-margin text-black">
                                            (optional)
                                        </Form.Text>
                                        <Form.Control type="text" id="inputContactCompany" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Link to your contact's linkedin profile </Form.Label>
                                        <Form.Text className="fst-italic italics-margin text-black">
                                            (if applicable)
                                        </Form.Text>
                                        <Form.Control type="text" id="inputContactLinkedIn" placeholder='https://' />
                                    </Col>
                                </Row>

                                <Row>
                                    <Row>
                                        <Col xs={6} className='form-contract-text'>
                                            <Form.Label >How did you make this contract </Form.Label>
                                        </Col>
                                    </Row>
                                    <Col className='form-contract-text'>

                                        <DropdownButton id="makeContactDropdown" title="Select One? " variant="secondary" size="md">

                                            {/* Not sure what kind of status option to put here */}
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Stack direction='horizontal' gap={1}>
                                                {['checkbox'].map((type) => (
                                                    <div key={`default-${type}`} className="mb-3">
                                                        <Form.Check
                                                            type={type}
                                                            id={`default-${type}`}
                                                        />
                                                    </div>

                                                ))}
                                                <Stack gap={0}>
                                                    <p className='checkbox'> Log as informational interview requirement</p>
                                                    <p className="checkboxhelp"> What does this mean? </p>
                                                </Stack>
                                            </Stack>
                                        </Row>
                                        <Row></Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className='form-box'>Tell us about your experience</Form.Label>
                                        <Form.Text className="fst-italic italics-margin text-black">
                                            We'd love to hear about your insights and & next steps you have planned!
                                        </Form.Text>
                                        <Form.Control as="textarea" rows={6} />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Container>
                    </Tab>
                </Tabs>
            </div >
        </div>
    );
}
