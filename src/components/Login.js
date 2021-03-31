import React, { useState } from 'react'
import {Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'

import BasicNav from './BasicNav'
import './styles/Background.css'
import './styles/Login.css'

function Login(){
    const [errors, setErrors] = useState([])

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email Format').required('Required'),
        password: yup.string().required('Required')
    })

    const alerts = errors.map(error => 
        <Alert key={error} variant='danger'>
            {error}
        </Alert>
    )

    return(
        <>

            <BasicNav />
            <div className = "cont" id = "background">
                <Formik 
                    initialValues={{email: '', password: '', stayLoggedIn: true}} 
                    onSubmit={async (data, {setSubmitting}) => {
                        setSubmitting(true)
                        
                        const response = await fetch('http://localhost:3000/login', {
                            method: 'POST',
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
                        <Form className="login-form" id = "form-style" onSubmit={handleSubmit}>
                            <h1> Login </h1>
                            {alerts}
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    name="email"
                                    placeholder="email@example.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && errors.email}
                                />
                                <ErrorMessage name="email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name='password'
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={touched.password && errors.password}
                                />
                                <ErrorMessage name="password" /> 
                            </Form.Group>
                            <Form.Group>
                                <Form.Check 
                                    name='stayLoggedIn'
                                    label="Stay Logged In"
                                    value={values.stayLoggedIn}
                                    checked={values.stayLoggedIn}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /></Form.Group> 
                            <Link to='/register'>Register</Link>
                            <br></br>
                            <Link to='/forgot'>Forgot Password?</Link>
                            <br></br>
                            <br></br>
                            <Button disabled={setSubmitting} variant="primary" type="submit">
                                Submit
                            </Button>   
                        </Form>
                    )}</Formik>
            </div>
        </>
    )

}

    

export default Login

