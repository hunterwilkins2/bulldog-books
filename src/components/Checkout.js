/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {Button, Card, Col, Container, Form, Row, ListGroup} from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'


import StoreNavbar from './StoreNavbar'
import StateList from './forms/StateList'
import './styles/Checkout.css' 
import './styles/Background.css'

function Checkout(){

    const [orderItems, setOrderItems] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [payments, setPayments] = useState([])
    const [address1, setAddress1] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [addressId, setAddressid] = useState('')


    async function fetchBooks(){
        let orderItemsGetData={
            method: 'GET',
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
        }
        const response = await fetch('http://localhost:3000/api/cart', orderItemsGetData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) 
        }
        await setOrderItems(data)
        console.log(data)
    }


    useEffect(() => {
        async function fetchData(){

            const headers =  {
                method: 'GET',
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
            }

            const infoResponse = await (await fetch('http://localhost:3000/api/profile', headers)).json()
            const paymentResponse = await (await fetch('http://localhost:3000/api/payment', headers)).json()
            const addressResponse = await (await fetch('http://localhost:3000/api/address', headers)).json()
            if(infoResponse){
                setFirstName(infoResponse.firstName)
                setLastName(infoResponse.lastName)
            }
            if(paymentResponse){
                setPayments(paymentResponse)
            }
            if(addressResponse){
                setAddress1(addressResponse.street)
                setCity(addressResponse.city)
                setState(addressResponse.state)
                setZip(addressResponse.zipcode)       
                setAddressid(addressResponse._id)
            }         
        }
        fetchData()
        fetchBooks()
    }, [])


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const orderSummaryItems = orderItems.map((item) => (
        <>
            <ListGroup.Item key={item} id = "li-co">
                <Col id = "col1-co">
                    {item.book.title} ({item.bookQuantity}):                                   
                </Col>
                <Col id = "col2-co">
                    {formatter.format(item.book.sellPrice * item.bookQuantity)}                            
                </Col>
                                                
            </ListGroup.Item>
        </>
    ))

    const paymentOptions = payments.map((payment) => {

        return(
            <>
                <option value={payment._id}>{payment.type} {payment.expirationDate.slice(0,10)}</option>
            </>
        )
    })

    let total = 0
    orderItems.forEach(cartItem => {
        total = total + (cartItem.book.sellPrice * cartItem.bookQuantity)
    })

    let tax = total * .08

    let delfee = 12

    return(

        <div id = "background">

            <StoreNavbar/> 
            <h1 id = "title-checkout">Checkout for {firstName} {lastName}</h1>

            <Container id = "cont1-co">
                <Card id = "card1-co">
                    <Card.Title id = "card1-title-co"> Order Summary </Card.Title>
                    <ListGroup variant="flush">
                        {orderSummaryItems}
                        <ListGroup.Item id = "li-co">
                            <Col id = "col1-co">
                                                    Total:                                   
                            </Col>
                            <Col id = "col2-co">
                                {formatter.format(total)}                            
                            </Col>
                        </ListGroup.Item>
                        <ListGroup.Item id = "li-co">
                            <Col id = "col1-co">
                                                    Tax:                                   
                            </Col>
                            <Col id = "col2-co">
                                {formatter.format(tax)}                            
                            </Col>
                        </ListGroup.Item>
                        <ListGroup.Item id = "li-co">
                            <Col id = "col1-co">
                                                    Delivery Fee:                                   
                            </Col>
                            <Col id = "col2-co">
                                {formatter.format(delfee)}                           
                            </Col>
                        </ListGroup.Item>
                        <ListGroup.Item id = "li-gt-co">
                            <Col id = "col1-co">
                                                    GRAND TOTAL                                   
                            </Col>
                            <Col id = "col2-co">
                                {formatter.format(total + tax + delfee)}                            
                            </Col>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Container>

            <Container id = "main-cont-checkout">
                <Formik 
                    enableReinitialize
                    initialValues={{
                        useExistingAddress: false,
                        address1: address1,
                        city: city,
                        state: state,
                        zip: zip,
                        useExistingPayment: false,
                        payment: '',
                        cardType: '',
                        cardNumber: '',
                        expirationDate: '',
                        promo: ''
                    }} 
                    onSubmit={async (data) => {

                        console.log(data)

                        let paymentIdSend, addressIdSend


                        if(data.address1 === address1 && data.state === state && data.city === data.city && data.zip === zip && data.useExistingAddress){
                            console.log(addressId)
                            addressIdSend = addressId
                        }
                        if(data.useExistingPayment && data.payment){
                            console.log(data.payment)
                            paymentIdSend = data.payment
                        }
                        if (!data.useExistingAddress){
                            let addressData = {
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
                                    street: data.address1,
                                    city: data.city,
                                    state: data.state,
                                    zipcode: data.zip
                                })
                            }
                            const addressResponse = await (await fetch('http://localhost:3000/api/address/temp-address', addressData)).json()
                            console.log(addressResponse)
                            addressIdSend = addressResponse._id
                        }
                        if(!data.useExistingPayment){
                            let paymentData = {
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
                                    cardNumber: data.cardNumber,
                                    type: data.cardType, 
                                    expirationDate: data.expirationDate
                                })
                            }
                            const paymentResponse = await (await fetch('http://localhost:3000/api/payment/temp-payment', paymentData)).json()
                            console.log(paymentResponse)
                            paymentIdSend = paymentResponse._id
                        }
                        if(data.promo != ''){
                            console.log(data.promo)
                        }

                        let orderData = {
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
                                paymentId: paymentIdSend,
                                addressId: addressIdSend, 
                                promotionTitle: data.promo
                            })
                        }

                        const orderResponse = await (await fetch('http://localhost:3000/api/order', orderData)).json()
                        console.log(orderResponse)

                    }}
                >{({ handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        setSubmitting
                    }) => (
                        <Form id = "main-form-co" onSubmit={handleSubmit}>
                            <h3 className = "form-titles-co"> Address Information </h3>
                            <Form.Group>
                                <Form.Check 
                                    name='useExistingAddress'
                                    label="Use Existing Address"
                                    value={values.useExistingAddress && false}
                                    checked={values.useExistingAddress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group> 
                            <Form.Group>
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control 
                                    name="address1"
                                    value={values.address1}
                                    type="text" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.address1 && !errors.address1}
                                    isInvalid={touched.address1 && errors.address1} 
                                />
                                <ErrorMessage name="address1" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control id = "form-control-profile"
                                        name="city"
                                        value={values.city}
                                        type="text" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.city && !errors.city}
                                        isInvalid={touched.city && errors.city} 
                                    />
                                    <ErrorMessage name="city" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control id = "form-control-profile"
                                        as="select" 
                                        name="state"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.state && !errors.state}
                                        isInvalid={errors.state}
                                    >
                                        <StateList/>
                                    </Form.Control>
                                    <ErrorMessage name="state" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control id = "form-control-profile"
                                        name="zip"
                                        value={values.zip}
                                        type="text" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.zip && !errors.zip}
                                        isInvalid={touched.zip && errors.zip} 
                                    />
                                    <ErrorMessage name="zip" />
                                </Form.Group>
                            </Form.Row>
                            <h3 className = "form-titles-co"> Payment Information </h3>
                            <Form.Group>
                                <Form.Check 
                                    name='useExistingPayment'
                                    label="Use Existing Payment"
                                    value={values.useExistingPayment}
                                    checked={values.useExistingPayment}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group> 
                            <Form.Group >
                                <Form.Label>Select Existing Payment</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="payment"
                                    value={values.payment}
                                    onChange={handleChange}
                                >
                                    <option value=''>Choose...</option>
                                    {paymentOptions}
                                </Form.Control>
                                <ErrorMessage name="state" />
                            </Form.Group>
                            <h4 className = "form-titles-co">New Payment Information</h4>
                            <Form.Group  >
                                <Form.Label>Card Type</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="cardType"
                                    value={values.cardType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cardType && !errors.cardType}
                                    isInvalid={touched.cardType && errors.cardType}
                                >
                                    <option value=''>Choose...</option>
                                    <option value='Visa'>Visa</option>
                                    <option value='American Express'>American Express</option>
                                    <option value='MasterCard'>MasterCard</option>
                                </Form.Control>
                                <ErrorMessage name="cardType" />
                            </Form.Group>
                            <Form.Group controlID="formCardNumber">
                                <Form.Label>Credit Card Number</Form.Label>
                                <Form.Control 
                                    name="cardNumber"
                                    placeholder="Credit Card Number"
                                    value={values.cardNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="newCardNumber" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control 
                                        name="expirationDate"
                                        type="date"
                                        value={values.expirationDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.expirationDate && !errors.expirationDate}
                                        isInvalid={errors.expirationDate}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <h3 className = "form-titles-co"> Promo Code </h3>
                            <Form.Group controlID="formCardNumber">
                                <Form.Label>Promo Code </Form.Label>
                                <Form.Control 
                                    name="promo"
                                    placeholder="PROMO"
                                    value={values.promo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.promo && !errors.promo}
                                    isInvalid={errors.promo}
                                />
                                <ErrorMessage name="promo" />
                            </Form.Group>
                            <Button id = "but-sub-co"disabled={setSubmitting} variant="primary" type="submit">
                                Submit
                            </Button>   
                        </Form>
                    )}</Formik>
            </Container>
        </div>  
    )
}

export default Checkout