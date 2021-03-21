/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as formik from 'formik'
import { Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'

import StoreNavbar from './StoreNavbar'
import './styles/Register.css'

function Register(){

    const formStyle = {
        border:'2px solid #ffffff',
        background: '#ffffff',
        borderRadius: '25px'
    }

    const validationSchema = yup.object().shape({
        firstName: yup.string()
            .min(1, 'First Name must be betwen 1 and 100 characters')
            .max(100, 'First Name must be betwen 1 and 100 characters')
            .required('Required'),
        lastName: yup.string()
            .min(1, 'Last Name must be betwen 1 and 100 characters')
            .max(100, 'Last Name must be betwen 1 and 100 characters')
            .required('Required'),
        email: yup.string().email('Invalid Email Format').required('Required'),
        password: yup.string().required('Required'),
        address1: yup.string()
            .min(1, 'Address Line 1 must be betwen 1 and 100 characters')
            .max(100, 'Address Line 1 must be betwen 1 and 100 characters'),
        address2: yup.string()
            .min(1, 'Address Line 2 must be betwen 1 and 100 characters')
            .max(100, 'Address Line 2 must be betwen 1 and 100 characters'),
        city: yup.string()
            .min(1, 'Please enter a valid city name')
            .max(23, 'Please enter a valid city name'),
        zip: yup.string()
            .length(5, 'Enter a valid zip code of length 5')
            .matches('^[0-9]*$', 'zip code can only contain numbers'),
        cardNumber: yup.string()
            .length(16, 'Enter a valid card number of length 16')
            .matches('^[0-9]*$', 'card number can only contain numbers'),
        security: yup.string()
            .min(3, 'Minimum length of 3')
            .max(4, 'Maximum length of 4')
            .matches('^[0-9]*$', 'card number can only contain numbers')
    })

    return(
        <>
            <StoreNavbar/>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    recievePromos: false,
                    address1:  '',
                    address2: '',
                    city: '',
                    zip: '',
                    state: '',
                    cardType: '',
                    cardNumber: '',
                    expiration: '',
                    security: ''
                }}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true)
                    // make async call to DB eventually
                    console.log(data)
                    setSubmitting(false)
                }}
                validationSchema={validationSchema}
            >
                {({ handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    setSubmitting
                }) => (
                    <div style={{display: 'flex', justifyContent: 'center', maxWidth: '100vw'}}>
                        <Form className="register-form" style={formStyle} onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        name="firstName"
                                        placeholder="First Name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.firstName && !errors.firstName}
                                        isInvalid={touched.firstName && errors.firstName}
                                    />
                                    <ErrorMessage name="firstName" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.lastName && !errors.lastName}
                                        isInvalid={touched.lastName && errors.lastName}
                                    />
                                    <ErrorMessage name="lastName" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        name='email'
                                        type="email" 
                                        placeholder="Enter email" 
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={touched.email && errors.email}
                                    />
                                    <ErrorMessage name="email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        name='password'
                                        type="password" 
                                        placeholder="Password" 
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={touched.password && errors.password}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group id="formCheckbox">
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="Recieve Promo Codes via Email"
                                    name="recievePromos"
                                    value={values.recievePromos}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Form.Group controlId="formAddress1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control 
                                    name="address1"
                                    placeholder="Address Line 1"
                                    value={values.address1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.address1 && !errors.address1}
                                    isInvalid={touched.address1 && errors.addres1}
                                />
                                <ErrorMessage name="address1" />
                            </Form.Group>
                            <Form.Group controlId="formAddress2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control 
                                    placeholder="Apartment, studio, or floor" 
                                    name="address2"
                                    value={values.address2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.address2 && !errors.address2}
                                    isInvalid={touched.address2 && errors.addres2}
                                />
                                <ErrorMessage name="address2" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        name="city"
                                        placeholder="City"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.city && !errors.city}
                                        isInvalid={touched.city && errors.city}
                                    />
                                    <ErrorMessage name="city" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        defaultValue="Choose..."
                                        name="state"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="Choose...">Choose...</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        name="zip"
                                        placeholder="Zip Code"
                                        value={values.zip}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.zip && !errors.zip}
                                        isInvalid={touched.zip && errors.zip}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formCardType">
                                <Form.Label>Card Type</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    defaultValue="Choose..."
                                    name="cardType"
                                    value={values.cardType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={(touched.cardType && errors.cardType) || (!touched.cardType && (touched.cardNumber || touched.security || touched.expiration )) }
                                    isValid={touched.cardType && !errors.cardType}
                                >
                                    <option>Choose...</option>
                                    <option>Visa</option>
                                    <option>American Express</option>
                                    <option>MasterCard</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlID="formCardNumber">
                                <Form.Label>Credit Card Number</Form.Label>
                                <Form.Control 
                                    name="cardNumber"
                                    placeholder="Credit Card Number"
                                    value={values.cardNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cardNumber && !errors.cardNumber}
                                    isInvalid={(touched.cardNumber && (errors.cardNumber || values.cardNumber.length == 0))|| (!touched.cardNumber && (touched.cardType || touched.security || touched.expiration )) } 
                                />
                                <ErrorMessage name="cardNumber" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control 
                                        name="expiration"
                                        type="date"
                                        value={values.expiration}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.expiration && !errors.expiration}
                                        isInvalid={(touched.expiration && errors.expiration) || (!touched.expiration && (touched.cardType || touched.security || touched.cardNumber )) } 
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control 
                                        name="security"
                                        value={values.security}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.security && !errors.security}
                                        isInvalid={(touched.security && (errors.security || values.security.length == 0)) || (!touched.security && (touched.cardType || touched.cardNumber || touched.expiration )) } 
                                    />
                                    <ErrorMessage name="security" />
                                </Form.Group>
                            </Form.Row>
                            <Link to='/confirmation'>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={Object.keys(errors).length > 0 || !touched.firstName || !touched.lastName  || !touched.email || !touched.password} >
                            Submit
                                </Button>
                            </Link>
                        </Form>
                    </div>
                )}</Formik>
        </>
    )
}

export default Register
