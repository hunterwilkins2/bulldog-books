/* eslint-disable react/prop-types */
import React from 'react'
import { Navbar, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap'
import {  } from 'react-bootstrap-icons'
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

function StoreNavbar({ login=false}){

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


            {!login && 

            <Nav id = "nav-link-style" >

                {Cookies.get('userType') === 'admin' && 
                <DropdownButton id="button-profile" title="Admin" className='button-navbar'>
                    <Dropdown.Item  as={Link} to='/admin/AddBook'>Add Book</Dropdown.Item>
                    <Dropdown.Item  as={Link} to='/admin/ManageUsers'>Manage Users</Dropdown.Item>
                    <Dropdown.Item  as={Link} to='/admin/ManagePromotions'>Manage Promotions</Dropdown.Item>
                    
                </DropdownButton>
                }

                <DropdownButton id="button-profile" title="Profile" className='button-navbar'>
                    <Dropdown.Item  as={Link} to='/user/Profile'>Profile</Dropdown.Item>
                    <Dropdown.Item  as={Link} to='/user/Orders'>Orders</Dropdown.Item>
                    {Cookies.get('userType') !== ('admin') &&
                        <Dropdown.Item  as={Link} to='/user/Cart'>Cart</Dropdown.Item>
                    }
                </DropdownButton>

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
