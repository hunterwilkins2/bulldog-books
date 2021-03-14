import React from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
//import { Link } from 'react-router-dom'

import UserNav from './UserNav'
import '../../styles.css'

function Profile(){

    const formStyle = {
        border:'0.5px solid #ffffff',
        background: '#ffffff',
        borderRadius: '20px',
        padding: '15px',
        margin: '2%',
        height: '95%',
    }

    const h1Style = {
        fontSize: '1.5em'
    }

    return(
        <>
            <UserNav/>
            <Container>
                <Row>
                    <Col>
                        <Form className="edit-login-form" style={formStyle}>
                            <h1 style={h1Style}>Update Info</h1>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="email@example.com" />
                            </Form.Group> 
                            <Form.Group controlId="formPromoCheckbox">
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="Recieve Promo Codes via Email"
                                /></Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <Form className="edit-card-form" style={formStyle}>
                            <h1 style={h1Style}>Update Payment</h1>
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
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>   
                        <Form classname="edit-address-form" style={formStyle}>
                            <h1 style={h1Style}>Update Address</h1>
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
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <Form classname="edit-password-form" style={formStyle}>
                            <h1 style={h1Style}>Update Password</h1>
                            <Form.Group controlId="formOldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Old Password" />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New Password" />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                    Save Changes
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Profile