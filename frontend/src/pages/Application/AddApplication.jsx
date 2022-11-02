import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { MainSidebar } from '../../components/Sidebar';
import { Row, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import "./AddApplication.scss"
import { ProSidebarProvider } from 'react-pro-sidebar';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Test = () => {
/*
router.post("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
*/ 
const [username, setUsername] = useGlobalState();
const [role, setRole] = useGlobalState();
const [company_name, setCompany_name] = useGlobalState();
const [jobpostlink,setJobPostLink] = useGlobalState();
const [location, setLocation] = useGlobalState();
const [dateApp, setDateApp] = useState(new Date());
const _status = "Applied"

let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          mobileNumber: mobileNumber,
        }),
      });

      const addApplication = (jobpostlink) => {
        fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "POST",
            headers: {
                'Authorization': /*Add Authorization? */ ,
                "Content-type": "application/json"
            },
            body: JSON.stringify({ application: { 
                username: /*Username*/,
                role: role,
                company_name, company_name,
                jobpostlink,
                location: location,
                dateofapplication: dateApp,
                status: _status
            }})
        })
            .then(response => {
                console.log(response.status);
                return response.json();
            }).then(data => console.log(data));
    }


    return (
        <Container fluid >
            <Row>
                <Col >
                    <ProSidebarProvider>
                        <MainSidebar />
                    </ProSidebarProvider>
                </Col>
                <Col xs md="10" className="main-body">
                    <Row>
                        <h1> Add Application</h1>
                    </Row>
                    <Row className='col'>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
                            <div id="form-box">
                                <Form onSubmit={addApplication(jobpostlink)}>
                                   
                                    <Row>
                                        <Form.Group as={Col} className="test" controlId="formRole">
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control type="position" className="test" placeholder="Enter position" onChange={(e) => setRole(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group as={Col} className="test" controlId="formCompanyName" >
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control type="company name" placeholder="Enter company name" onChange={(e) => setCompany_name(e.target.value)}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="formJobPostLink">
                                            <Form.Label>Job Posting</Form.Label>
                                            <Form.Control type="job link" placeholder="Enter job post link" onChange={(e) => setJobPostLink(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3" controlId="formLocation">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="location" placeholder="Enter job location" onChange={(e) => setLocation(e.target.value)}/>
                                        </Form.Group>
                                        <DatePicker selected={startDate} onChange={(date) => setDateApp(date)} />
                                    </Row>
                                    <Row className="formButton">
                                        
                                        <Col sm={{ span: 2, offset: 10 }} md={{ span: 2, offset: 10 }}>
                                            <Button variant="primary" >Submit</Button>{' '}
                                        </Col>
                                    </Row>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
