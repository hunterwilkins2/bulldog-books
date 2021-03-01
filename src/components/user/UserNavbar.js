/* eslint-disable react/prop-types */
import React from 'react'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'
import { Link, NavLink} from 'react-router-dom'

import bulldawgbook from '../images/bulldawgbook.png' 

function UserNavbar(){

    const linkStyle = {
        textDecoration: 'none', 
        color: 'white' 
    }

    const navLinkStyle = {
        color: 'white',
        padding: '10px'
    }

    return(
        <Navbar className="basic-nav" variant="dark">
            <Navbar.Brand className="navbar-brand" href="#home">
                <Link to='/'>
                    <img
                        alt=""
                        src={bulldawgbook}
                        width="55"
                        height="55"
                        className="d-inline-block align-top"
                    />{' '}
                </Link>
                <Link to='/user' style={linkStyle}> Bulldawg Books </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink to="/user/orders" style={navLinkStyle}>Orders</NavLink>
                <NavLink to="/user/cart" style={navLinkStyle}>Cart</NavLink>
                <NavLink to="/user/profile" style={navLinkStyle}>Profile</NavLink>
                <NavLink to="/" style={navLinkStyle}>Logout</NavLink>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Title, Author, ISBN" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
            
        </Navbar>
    )
}

export default UserNavbar