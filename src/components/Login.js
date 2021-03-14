import React from 'react'
import {Form, Button, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, Field } from 'formik'
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


    const schema = yup.object().shape({
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
                    validationSchema={schema}
                >{({values, errors, setSubmitting, handleSubmit}) => (
                        <Form className="login-form" style={formStyle} onSubmit={handleSubmit}>
                            <h1> Login </h1>
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
                <Form className="login-form" style={formStyle}>
                    <h1>Best Sellers</h1>
                    < BestSellers />
                </Form>
            </div>
        </>
    )

}

    

export default Login

