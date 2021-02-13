import React from 'react'
import { Form, Button } from 'react-bootstrap'

import StoreNavbar from './StoreNavbar'

function Forgot(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }

    return(
        <>
            <StoreNavbar />
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                <Form className="login-form" style={formStyle}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com" />
                        <Form.Text className="text-muted">
                        If you have already submitted a request, please be patient.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Request Password Reset
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Forgot