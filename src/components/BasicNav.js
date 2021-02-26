/* eslint-disable react/prop-types */
import React from 'react'
import { Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import bulldawgbook from './images/bulldawgbook.png' 

function BasicNav(){

    const linkStyle = {
        fontFamily: 'Bebas Neue',
        fontSize: '40px',
        textDecoration: 'none', 
        color: 'white' 
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
                <Link to='/' style={linkStyle}>
                    <span className="text-white">Bulldawg</span>
                    <span className="text-danger"> Books</span> 
                </Link>
            </Navbar.Brand>

        </Navbar>
    )
}

export default BasicNav