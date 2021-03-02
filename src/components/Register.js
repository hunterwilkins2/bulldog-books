import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import StoreNavbar from './StoreNavbar'
import './styles/Register.css'

function Register(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }

    return(
        <>
            <StoreNavbar/>
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                <Form className="register-form" style={formStyle}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First Name" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Last Name" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group id="formCheckbox">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Recieve Promo Codes via Email"
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                    <Form.Group controlId="formAddress2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="City" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control placeholder="Zip Code" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formCardType">
                        <Form.Label>Card Type</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlID="formCardNumber">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control placeholder="Credit Card Number"/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formCardExpiration">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control placeholder="MM/DD/YYYY" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formCardCode">
                            <Form.Label>Security Code</Form.Label>
                            <Form.Control placeholder="Security code" />
                        </Form.Group>
                    </Form.Row>
                    <Link to='/confirmation'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Link>
                </Form>
            </div>
        </>
    )
}

export default Register
