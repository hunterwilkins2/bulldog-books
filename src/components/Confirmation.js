import React from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'

import StoreNavbar from './StoreNavbar'
import './styles/Login.css'

function Confirmation(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }

    const validationSchema = yup.object().shape({
        code: yup.string().length(6, 'Must be length 6').required('Required')
    })


    return(
        <>
            <StoreNavbar/>
            <Formik
                initialValues={{
                    code: ''
                }}
                onSubmit={ async (data) => {
                    let confirmationData = {
                        method: 'POST',
                        withCredentials: true,
                        credentials: 'include',
                        mode: 'cors',
                        cache: 'no-cache',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'https://localhost:3000',
                            'Access-Control-Allow-Credentials': true,
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify({
                            confirmationCode: data.code
                        })
                    }
                    const registerResponse = await (await fetch('http://localhost:3000/confirmation', confirmationData)).json()
                    console.log(registerResponse)

                }}
                validationSchema={validationSchema}
            >
                {({ handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    dirty,
                    isValid,
                    submitForm
                }) => (
                    <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                        <Form className="login-form" style={formStyle} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Text>Check your email for a six digit confirmation code to active your account. If you did not recieve it, you can click resend email.</Form.Text>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formConfiramtion">
                                    <Form.Label>Confirmation code</Form.Label>
                                    <Form.Control 
                                        name="code"
                                        value={values.code}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.code && !errors.code}
                                        isInvalid={touched.code && errors.code}
                                    />
                                    <ErrorMessage name="code" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Button 
                                        variant="secondary" 
                                        type="submit"
                                    >
                                Resend email
                                    </Button>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Link style={{float: 'right'}} to="/">
                                        <Button 
                                            variant="primary" 
                                            type="submit" 
                                            disabled={!(dirty && isValid)}
                                            onClick={submitForm}
                                        >
                                    Submit
                                        </Button>
                                    </Link>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </div>
                )}</Formik>
        </>
    )
}

export default Confirmation
