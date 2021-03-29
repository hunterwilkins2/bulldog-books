/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'


import StoreNavbar from './StoreNavbar'
import './styles/Background.css'
import './styles/ForgotPassword.css'

function Forgot(){

    const [errors, setErrors] = useState([])

    // const formStyle = {
    //     border:'2px solid #ffffff',
    //     background: '#ffffff',
    //     borderRadius: '25px'
    // }

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email Format').required('Required'),
        oldPassword: yup.string().required('Required'),
        newPassword: yup.string().required('Required')
    })

    const alerts = errors.map(error => 
        <Alert key={error} variant='danger'>
            {error}
        </Alert>
    )

    return(
        <div id = "background">
            <StoreNavbar />
            <div id = "main-cont-forgot">
                <Formik 
                    initialValues={{email: '', oldPassword: '', newPassword: ''}} 
                    onSubmit={async (data, {setSubmitting}) => {
                        setSubmitting(true)
                        
                        const response = await fetch('http://localhost:3000/reset-password', {
                            method: 'PATCH',
                            withCredentials: true,
                            credentials: 'include',
                            headers: {
                                'Content-type': 'application/json',
                                'Access-Control-Allow-Origin': 'https://localhost:3000',
                                'Access-Control-Allow-Credentials': true,
                            },
                            body: JSON.stringify(data)
                        })
                        setSubmitting(false)

                        const messages = await response.json()

                        if(messages.errors) {
                            console.log(messages.errors.split(';'))
                            setErrors(messages.errors.split(';'))
                        } else {
                            window.location.href='/'
                        }
                    }}
                    validationSchema={validationSchema}
                >{({ handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        setSubmitting
                    }) => (
                        <Form className="login-form" id = "form-style-forgot" onSubmit={handleSubmit}>
                            <h1> Reset Password </h1>
                            {alerts}
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Confirm your email address</Form.Label>
                                <Form.Control 
                                    name="email"
                                    placeholder="Email Address"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && errors.email}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password sent to your email</Form.Label>
                                <Form.Control controlId="formBasicPassword"
                                    name="oldPassword"
                                    placeholder="Old password"
                                    value={values.oldPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.oldPassword && !errors.oldPassword}
                                    isInvalid={touched.oldPassword && errors.oldPassword}
                                />
                                <ErrorMessage name="oldPassword" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    name="newPassword"
                                    placeholder="New Password"
                                    type="password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.newPassword && !errors.newPassword}
                                    isInvalid={touched.newPassword && errors.newPassword}
                                />
                                <ErrorMessage name="newPassword" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                    Reset Password
                            </Button>   
                        </Form>
                    )}</Formik> 
            </div>
        </div>
    )
}

export default Forgot



/**
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
 */
