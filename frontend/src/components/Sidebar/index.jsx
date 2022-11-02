import React from 'react'
import { Button } from 'reactstrap'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export class MainSidebar extends React.Component {
    render() {
        return (

            <Sidebar>
                <Menu>
                    <MenuItem routerLink={<Link to="/" />}> Home </MenuItem> 
                    <MenuItem routerLink={<Link to="/application" />}> Application </MenuItem>
                    <MenuItem routerLink={<Link to="/calendar" />}> Calendar </MenuItem>
                    <MenuItem routerLink={<Link to="/account" />}> User Information </MenuItem>
                </Menu>
            </Sidebar>
                 
                    )
    }
}
