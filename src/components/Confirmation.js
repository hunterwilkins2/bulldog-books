import React from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import StoreNavbar from './StoreNavbar'
import './styles/Login.css'

function Confirmation(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }


    return(
        <>
            <StoreNavbar/>
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                <Form className="login-form" style={formStyle}>
                    <Form.Group>
                        <Form.Text>Check your email for a six digit confirmation code to active your account. If you did not recieve it, you can click resend email.</Form.Text>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formConfiramtion">
                            <Form.Label>Confirmation code</Form.Label>
                            <Form.Control placeholder="XXXXXX" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="secondary" type="submit">
                                Resend email
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Link style={{float: 'right'}} to="/user">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        </>
    )
}

export default Confirmation
