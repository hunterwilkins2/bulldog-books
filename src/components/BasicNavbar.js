import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './styles/BasicNavbar.css'
import bulldawgbook from './images/bulldawgbook.png' 

function BasicNavbar(){

    const linkStyle = {
        textDecoration: 'none', 
        color: 'white' 
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
                <Link to='/' style={linkStyle}> Bulldawg Books</Link>
            </Navbar.Brand>
        </Navbar>
    )
  
}

export default BasicNavbar