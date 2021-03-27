/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'

import StoreNavbar from './StoreNavbar'
import './styles/Background.css'
import './styles/Register.css'

function Register(){

    // const formStyle = {
    //     border:'2px solid #ffffff',
    //     background: '#ffffff',
    //     borderRadius: '25px'
    // }

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
            .when(['address2', 'city', 'state', 'zip'], {
                is: (address2, city, state, zip) => address2 === undefined && city === undefined && state === undefined && zip === undefined,
                then: yup.string().min(1, 'Minimum 1 Character').max(100,'Max 100 Characters').notRequired(),
                otherwise: yup.string().min(1, 'Minimum 1 Character').max(100,'Max 100 Characters').required('Address Line 1 is Required')
            }),
        address2: yup.string()
            .min(1, 'Address Line 2 must be betwen 1 and 100 characters')
            .max(100, 'Address Line 2 must be betwen 1 and 100 characters'),
        city: yup.string()
            .when(['address1', 'address2','state', 'zip'], {
                is: (address1, address2, state, zip) => address1 === undefined && address2 === undefined && state === undefined && zip === undefined,
                then: yup.string().min(1, 'Minimum 1 Character').max(23,'Max 23 Characters').notRequired(),
                otherwise: yup.string().min(1, 'Minimum 1 Character').max(23,'Max 23 Characters').required('City is Required')
            }),
        zip: yup.string()
            .when(['address1', 'address2','state', 'city'], {
                is: (address1, state, city, address2) => address1 === undefined && address2 === undefined && state === undefined && city === undefined,
                then: yup.string().length(5, 'Must be length 5').matches('^[0-9]*$', 'Must contain only contain numbers').notRequired(),
                otherwise: yup.string().length(5, 'Must be length 5').matches('^[0-9]*$', 'Must contain only contain numbers').required()
            }),
        state: yup.string()
            .when(['address1', 'address2','zip', 'city'], {
                is: (address1, address2, zip, city) => address1 === undefined && address2 === undefined && zip === undefined && city === undefined,
                then: yup.string().notRequired(),
                otherwise: yup.string().required()
            }),
        cardNumber: yup.string()
            .when(['security', 'expiration', 'cardType'], {
                is: (security, cardType, expiration) => security === undefined && cardType === undefined && expiration === undefined,
                then: yup.string().length(16, 'Must be 16 digits').matches('^[0-9]*$', 'Can only contain numbers').notRequired(),
                otherwise: yup.string().length(16, 'Must be 16 digits').matches('^[0-9]*$', 'Can only contain numbers').required()
            }),
        security: yup.string()
            .when(['cardNumber', 'expiration', 'cardType'], {
                is: (cardNumber, cardType, expiration) => cardNumber === undefined && cardType === undefined && expiration === undefined,
                then: yup.string().min(3, 'Minimum length of 3').max(4, 'Maximum length of 4').matches('^[0-9]*$', 'card number can only contain numbers').notRequired(),
                otherwise: yup.string().min(3, 'Minimum length of 3').max(4, 'Maximum length of 4').matches('^[0-9]*$', 'card number can only contain numbers').required()
            }),
        expiration: yup.date()
            .when(['cardNumber', 'security', 'cardType'], {
                is: (cardNumber, cardType, security) => cardNumber === undefined && cardType === undefined && security === undefined,
                then: yup.date().notRequired(),
                otherwise: yup.date().required()
            }),
        cardType: yup.string()
            .when(['cardNumber', 'security', 'expiration'], {
                is: (cardNumber, expiration, security) => cardNumber === undefined && expiration === undefined && security === undefined,
                then: yup.string().notRequired(),
                otherwise: yup.string().required()
            })
    }, [['address1', 'city'], 
        ['address1', 'zip'], 
        ['city', 'zip'], 
        ['address1', 'state'],
        ['city', 'state'], 
        ['zip', 'state'],
        ['address2', 'city'],
        ['address2', 'address1'],
        ['address2', 'zip'],
        ['address2', 'state'],
        ['cardNumber', 'security'],
        ['cardNumber', 'expiration'],
        ['cardNumber', 'cardType'],
        ['security', 'expiration'],
        ['security', 'cardType'],
        ['expiration', 'cardType'],
        ['expiration', 'cardNumber']
    ])
    return(
        <div id = "background">
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
                    setSubmitting,
                    dirty,
                    isValid
                }) => (
                    <div className = "mx-auto" id = "main-cont-register" >
                        <Form id="register-form" onSubmit={handleSubmit}> 
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
                                    isInvalid={errors.address1}
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
                                        isInvalid={errors.city}
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
                                        isValid={touched.state && !errors.state}
                                        isInvalid={errors.state}
                                    >
                                        <option value="">Choose...</option>
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
                                        isInvalid={errors.zip}
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
                                    isValid={touched.cardType && !errors.cardType}
                                    isInvalid={errors.cardType}
                                >
                                    <option value = ''>Choose...</option>
                                    <option value='Visa'>Visa</option>
                                    <option value='American Express'>American Express</option>
                                    <option value='Mastercard'>MasterCard</option>
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
                                    isInvalid={errors.cardNumber}
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
                                        isInvalid={errors.expiration}
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
                                        isInvalid={errors.security}
                                    />
                                    <ErrorMessage name="security" />
                                </Form.Group>
                            </Form.Row>
                            <Link to='/confirmation'>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={!(dirty && isValid)}
                                >
                            Submit
                                </Button>
                            </Link>
                        </Form>
                    </div>
                )}</Formik>
        </div>
    )
}

export default Register
