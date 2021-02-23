import React from 'react'
import { Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import StoreNavbar from '../StoreNavbar'
import '../../styles.css'

// pick back up at 2:37 on the video

function Profile(){
    return(
        <>
            <StoreNavbar type="user"/>
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                <Formik initialValues={{}}>{() => (
                    <form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Submit </Button>
                    </form>
                )}</Formik>
            </div>
        </>
    )
}
export default Profile