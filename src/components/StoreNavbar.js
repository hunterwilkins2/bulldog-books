/* eslint-disable react/prop-types */
import React from 'react'
import { Navbar, Form, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap'
import { Basket, Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { getCookie, deleteCookie } from './cookie-parser'
import Cookies from 'js-cookie'

import bulldawgbook from './images/bulldawgbook.png' 
import './styles/StoreNavbar.css' 

function logout() {
    if(getCookie('jwt') || getCookie('userType')) {
        deleteCookie('jwt', '/', 'localhost')
        deleteCookie('userType', '/', 'localhost')
    }
}

function StoreNavbar({homePage=false, login=false}){

    return(
        <Navbar className="basic-nav" bg="dark">
            <Navbar.Brand className="navbar-brand" >
                <Link to='/'>
                    <img alt="" src={bulldawgbook}/>{' '}
                </Link>
                <Link to='/' id="logoLink">
                    <span className="text-white" id="text_bulldawg">BULLDAWG </span>
                    <span id="logoSpace"> </span>
                    <span className="text-danger" id="text_books">BOOKS</span>
                </Link>
            </Navbar.Brand>

            {homePage && 
            <Form inline id = "search-form-style" >
                <FormControl type="text" placeholder="Title, Author, ISBN" id = "searchStyle" />
                <Button id = "button-search" >
                    <Search></Search>
                </Button>
            </Form>

            }

            {!login && 

            <Nav id = "nav-link-style" >
                <DropdownButton id="button-profile" title="Profile">
                    <Dropdown.Item  as={Link} to='/user/Profile'>Profile</Dropdown.Item>
                    <Dropdown.Item  as={Link} to='/user/Orders'>Orders</Dropdown.Item>
                </DropdownButton>

                <Link to='/user/Cart'>
                    <Button id="button-cart" className="ml-2" variant="light"><Basket /> Cart</Button>{' '}
                </Link>

                {Cookies.get('userType') === 'admin' && 
                <>
                    <Link to='/admin/ManageUsers'>
                        <Button id="button-cart" className="ml-2" variant="light" >Manage Users</Button>
                    </Link>
                    <Link to='/admin/ManagePromotions'>
                        <Button id="button-cart" className="ml-2" variant="light" >Manage Promotions</Button>
                    </Link>
                </>
                }

                <Link to={!getCookie('jwt') ? '/login' : '/'}>
                    <Button id = "button-login" onClick={logout}
                        className="ml-2" 
                        variant="outline-info">
                        {!getCookie('jwt') ? 'Login' : 'Logout'}
                    </Button>{' '}
                </Link>
            </Nav>
            }

        </Navbar>
    )
}

export default StoreNavbar
