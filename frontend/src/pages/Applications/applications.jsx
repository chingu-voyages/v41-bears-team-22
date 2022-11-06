import React, { useState } from 'react';
import { HeaderBar } from '../../components/headerbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Row, Form, Container, Button } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./applications.scss"

export const Applications = () => {

    const [jobTitle, setJobTitle] = useState('');
    // const [companyName, setCompanyName] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <HeaderBar />
            <div className="container">
                <Row>
                    <Col>
                        <h1 className='title'>Add Application</h1>
                    </Col>
                </Row>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="tab-container mb-3"
                >
                    <Tab eventKey="Jobs" title="Jobs">
                        <p> Sample Text What's a personal statement, and why do you need one when you're job searching? A job search personal statement is a place to share why you're interested in a position and why you're a good match.</p>
                        <Container fluid className="shadow-sm p-3 mb-5 rounded form-container ">
                            <Form>
                                <Row>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Job Title</Form.Label>
                                        <Form.Control />

                                    </Col>
                                    <Col className='form-box'>
                                        <Form.Label className='form-label'>Job Description Url</Form.Label>
                                        <Form.Control type="text" id="inputJobDescrip" />
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
                                        <DatePicker className="date-picker" selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className='form-box'>Notes</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
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

                    </Tab>
                </Tabs>
            </div >
        </div>
    );
}
