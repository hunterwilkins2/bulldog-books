import React from 'react'
import { Navbar, Form, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap'
import { Basket, Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import bulldawgbook from '../images/bulldawgbook.png' 

function UserNav(){

    const linkStyle = {
        fontFamily: 'Bebas Neue',
        fontSize: '40px',
        textDecoration: 'none', 
        color: 'white' 
    }

    const navLinkStyle = {
        color: 'white',
        padding: '10px',
        marginLeft: '5%',
    }

    const searchFormStyle = {
        borderRadius: '.25rem 0 0 .25rem', 
    }

    const searchStyle = {
        width: '90%',
    }

    const buttonStyle = {
        width: '10%',
    }

    return(
        <Navbar className="basic-nav" bg="dark">
            <Navbar.Brand className="navbar-brand" href="#home">
                <Link to='/'>
                    <img
                        alt=""
                        src={bulldawgbook}
                        width="55"
                        height="55"
                    />{' '}
                </Link>
                <Link to='/user' style={linkStyle}>
                    <span className="text-white">Bulldawg</span>
                    <span className="text-danger"> Books</span> 
                </Link>
            </Navbar.Brand>

            <Form inline style={searchFormStyle} >
                <FormControl type="text" placeholder="Title, Author, ISBN" style={searchStyle} />
                <Button className="but button-primary" style={buttonStyle} >
                    <Search></Search>
                </Button>
            </Form>

            <Nav style={navLinkStyle}>
                <DropdownButton id="dropdown-basic-button" title="Profile">
                    <Dropdown.Item href="/user/Profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/user/Orders">Orders</Dropdown.Item>
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                </DropdownButton>

                <Button href="/user/Cart" className="ml-2" variant="light"><Basket /> Cart</Button>{' '}
            </Nav>
        </Navbar>
    )
}

export default UserNav