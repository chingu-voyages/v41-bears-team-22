import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export const Home = () => {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="Jobs" title="Jobs">
                <h1>Jobs</h1>
            </Tab>
            <Tab eventKey="Contacts" title="Contacts">
                <h1>Contacts</h1>
            </Tab>
        </Tabs>
    );
}
