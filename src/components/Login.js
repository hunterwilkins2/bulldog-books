import React from 'react'
import {Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

import BasicNav from './BasicNav'
import './styles/Login.css'

function Login(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }

    const schema = yup.object().shape({
        email: yup.string().email('Invalid Email Format').required('Required'),
        password: yup.string().required('Required')
    })
    

    return(
        <>
            <BasicNav />
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                <Formik 
                    initialValues={{email: '', password: ''}} 
                    onSubmit={(data, {setSubmitting}) => {
                        setSubmitting(true)
                        // make async call to DB eventually
                        console.log(data)
                        setSubmitting(false)
                    }}
                    validationSchema={schema}
                >{({values, errors, setSubmitting, handleSubmit}) => (
                        <Form className="login-form" style={formStyle} onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Field 
                                    placeholder="email@example.com" 
                                    name='email' as={Form.Control} 
                                    isInvalid={errors.email}/>
                                <Form.Text className="text-muted">
                                    We will never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Field 
                                    placeholder="password" 
                                    name='password' 
                                    type='password' 
                                    as={Form.Control}
                                    isInvalid={errors.password}/>
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
                            <Button disabled={setSubmitting} variant="primary" type="submit">
                                Submit
                            </Button>
                            <pre>{JSON.stringify(values, null, 2)}</pre>   
                            <pre>{JSON.stringify(errors, null, 2)}</pre>     
                        </Form>
                    )}</Formik>
            </div>
        </>
    )
}

export default Login

