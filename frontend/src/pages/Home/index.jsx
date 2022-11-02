import React, { useState } from 'react';
import {  DropdownButton} from 'react-bootstrap'
import { ProSidebarProvider } from 'react-pro-sidebar';

export const Home_Alt = () => {
    const [data, setData] = React.useState(null);
    const [count, setCount] = React.useState(0);

    var statusOptions = ["Applied", "Follow-Up", "Rejected"];

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.applications));
    }, []);

    /* Need to figure out authorization for both routes, 
    
    router.post("/token", async (req, res, next) => */

    const deleteApplication = (jobpostlink) => {
        fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "DELETE",
            headers: {
                'Authorization': /*Add Authorization? */ ,
                "Content-type": "application/json"
            },
            body: JSON.stringify({ status: _status })
        })
            .then(response => {
                console.log(response.status);
                return response.json();
            }).then(data => console.log(data));
    }

    /*
    Probably want to use this patch route, but havent gotten the UserID needed, 
    havent touched the login portion
    
    router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
    */
    const updateApplicationStatus = (_status) => {
        fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PATCH",
            headers: {
                'Authorization': /*Add Authorization? */ ,
                "Content-type": "application/json"
            },
            body: JSON.stringify({ status: _status })
        })
            .then(response => {
                console.log(response.status);
                return response.json();
            }).then(data => console.log(data));
    }

    //Might want to create seperate component?

    function DropdownItems(status) {
        for (let i = 0; i < statusOptions.size; i++) {
            if (statusOptions[i] !== status) {
                <Dropdown.Item onChange> {status} </Dropdown.Item>
            }
        }
    }

    const Dropdown = function (status) {
        return (
            <DropdownButton id="dropdown-basic-button" title={status}>
                DropDownItems()
            </DropdownButton>
        )
    }
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
                    <h1> All Applications</h1>
                </Row>
                <Row className='col'>
                    <Col sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Company</th>
                                    <th>Job Posting</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                                <tbody>

                                    {data.map(application => {
                                        <tr>
                                            <td> {Count} {setCount + 1} </td>
                                            <td>{application.role}</td>
                                            <td>{application.company_name}</td>
                                            <td>{application.jobpostlink}</td>
                                            <td>{application.location}</td>
                                            <td>{application.dateofapplication}</td>
                                            <td>{application.status}</td>
                                            <td> <Button variant="primary" size="sm" onChange={deleteApplication(application.jobpostlink)}>
                                                Delete </Button></td>
                                        </tr>
                                    })}


                                </tbody>
                            </thead>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
);

