import React from 'react'
import { Navbar, Form, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap'
import { Basket, Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import bulldawgbook from './images/bulldawgbook.png' 
import './styles/StoreNavbar.css' 

function UserNav(){

    return(
        <Navbar className="basic-nav" bg="dark">
            <Navbar.Brand className="navbar-brand" href="#home">
                <Link to='/'>
                    <img alt="" src={bulldawgbook}/>{' '}
                </Link>
                <Link to='/' className="text-white"  id = "text_bulldawg"> BULLDAWG </Link>
                <Link to='/' className="text-danger" id = "text_books">  BOOKS</Link>
            </Navbar.Brand>

            {/* {(type === 'user' || type ==='admin') &&   */}
            <Form inline id = "search-form-style" >
                <FormControl type="text" placeholder="Title, Author, ISBN" id = "searchStyle" />
                <Button className="but button-primary" id = "button-style" >
                    <Search></Search>
                </Button>
            </Form>

            {/* {(type === 'user' || type === 'admin') && */}
            <Nav id = "nav-link-style" >
                <DropdownButton id="dropdown-basic-button" title="Profile">
                    <Dropdown.Item href="/user/Profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/user/Orders">Orders</Dropdown.Item>
                    <Dropdown.Item href="/Login">Login</Dropdown.Item>
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                </DropdownButton>

                <Button href="/user/Cart" className="ml-2" variant="light"><Basket /> Cart</Button>{' '}
            </Nav>
        </Navbar>
    )
}

export default UserNav
