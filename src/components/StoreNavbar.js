import React from 'react'
import { Navbar, Form, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap'
import { Basket, Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { getCookie, deleteCookie } from './cookie-parser'

import bulldawgbook from './images/bulldawgbook.png' 
import './styles/StoreNavbar.css' 

function logout() {
    if(getCookie('jwt') || getCookie('userType')) {
        deleteCookie('jwt', '/', 'localhost')
        deleteCookie('userType', '/', 'localhost')
    }
}

function UserNav(){

    return(
        <Navbar className="basic-nav" bg="dark">
            <Navbar.Brand className="navbar-brand" href="#home">
                <Link to='/'>
                    <img alt="" src={bulldawgbook}/>{' '}
                </Link>
                <Link to='/' id="logoLink">
                    <span className="text-white" id="text_bulldawg">BULLDAWG </span>
                    <span id="logoSpace"> </span>
                    <span className="text-danger" id="text_books">BOOKS</span>
                </Link>
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
                </DropdownButton>

                <Button href="/user/Cart" className="ml-2" variant="light"><Basket /> Cart</Button>{' '}

                <Button onClick={logout}
                    href={!getCookie('jwt') ? '/login' : '/'} 
                    className="ml-2" 
                    variant="outline-info">
                    {!getCookie('jwt') ? 'Login' : 'Logout'}
                </Button>{' '}
            </Nav>
        </Navbar>
    )
}

export default UserNav
