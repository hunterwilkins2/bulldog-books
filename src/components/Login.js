import React from 'react'
import {Form, Button, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'

import BasicNav from './BasicNav'
import Promos from './Promos'
import BestSellers from './BestSeller'
// import './styles/Login.css'
import background from './images/background.jpg' 



function Login(){

    const cont = {
        display: 'flex',
        justifyContent: 'space-around',

        minHeight: '100vh',

        backgroundImage: `url(${background})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',

    }

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px',
        height: '100%',
        width: '100%',
        minWidth: '30%',
        margin: '1%',
    }


    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email Format').required('Required'),
        password: yup.string().required('Required')
    })


    return(
        <>

            <BasicNav />
            <div style = {cont}>

                <Form style ={formStyle}>
                    <h1>Promotions</h1>
                    <Promos />
                </Form>
                
                <Formik 
                    initialValues={{email: '', password: ''}} 
                    onSubmit={(data, {setSubmitting}) => {
                        setSubmitting(true)
                        // make async call to DB eventually
                        console.log(data)
                        setSubmitting(false)
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
                        <Form className="login-form" style={formStyle} onSubmit={handleSubmit}>
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
                            <Link to='user'>Continue Without an Account</Link>
                            <br></br>
                            <Link to='/admin'>Continue as Admin</Link>
                            <br></br>
                            <br></br>
                            <Button disabled={setSubmitting} variant="primary" type="submit">
                                Submit
                            </Button>   
                        </Form>
                    )}</Formik>
                <Form className="login-form" style={formStyle}>
                    <h1>Best Sellers</h1>
                    < BestSellers />
                </Form>
            </div>
        </>
    )

}

    

export default Login

