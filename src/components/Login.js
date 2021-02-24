import React from 'react'
import {Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import BasicNav from './BasicNav'
import './styles/Login.css'

function Login(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }

    return(
        <>
            <BasicNav />
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                <Form className="login-form" style={formStyle}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com" />
                        <Form.Text className="text-muted">
                    We will never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password1234" />
                    </Form.Group>
                    <Link to='/register'>Register</Link>
                    <br></br>
                    <Link to='/forgot'>Forgot Password?</Link>
                    <br></br>
                    <Link to={{
                        pathname: '/user',
                        userProps:{
                            admin: false
                        }
                    }}>Continue Without an Account</Link>
                    <br></br>
                    <Link to={{
                        pathname: '/admin',
                        userProps:{
                            admin: true
                        }
                    }}>Continue as Admin</Link>
                    <br></br>
                    <br></br>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Login