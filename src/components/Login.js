import React from 'react'
import {Form, Button, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'

import BasicNav from './BasicNav'
// import './styles/Login.css' 
import './styles/Background.css'
import './styles/Login.css'

function Login(){


    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email Format').required('Required'),
        password: yup.string().required('Required')
    })


    return(
        <>

            <BasicNav />
            <div className = "cont" id = "background">
                <Formik 
                    initialValues={{email: '', password: ''}} 
                    onSubmit={async (data, {setSubmitting}) => {
                        setSubmitting(true)
                        
                        await fetch('http://localhost:3000/login', {
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
                        console.log(data)
                        setSubmitting(false)

                        window.location.href='/'
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
                            <Form.Group controlId="formBasicEmail">
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
                            <Form.Group controlId="formBasicPassword">
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

