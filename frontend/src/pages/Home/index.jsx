import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    Col,
    Row,
    // Form,
    Input,
    Label,
    // Button,
    FormGroup,
} from 'reactstrap';
import './index.scss';

export const Home = () => {
    const [jobTitle, setJobTitle] = useState('');
    // const [companyName, setCompanyName] = useState('');

    return (

        <div className="container">
            <Row>
                <Col>
                    <h1 className='title'>Fast Track</h1>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="tab-container mb-3"
            >
                <Tab eventKey="Jobs" title="Jobs">
                    <FormGroup>
                        <Label className="job-title" for="jobTitle">Job Title: </Label>
                        <Input
                            autoFocus
                            type="text"
                            value={jobTitle}
                            id="jobTitle"
                            name="jobTitle"
                            className="jobTitle"
                            placeholder="  Enter the job title"
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="company-name" for="companyName">Company Name: </Label>
                        <Input
                            autoFocus
                            type="text"
                            // value={companyName}
                            id="companyName" Name
                            name="companyName"
                            className="companyName"
                            placeholder="  Enter the company name"
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                    </FormGroup>
                </Tab>
                <Tab eventKey="Contacts" title="Contacts">
                    <h1>Contacts</h1>
                </Tab>
            </Tabs>
        </div>
    );
}
