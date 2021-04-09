import {React, useEffect, useState} from 'react'
import { Formik } from 'formik'
import {Button, Card, Col, ListGroup, ListGroupItem, Form, Row} from 'react-bootstrap'
import * as yup from 'yup'

import StoreNavbar from '../StoreNavbar'

function ManagePromotions(){
    const [promotions, setPromotions] = useState([])

    const validationSchema = yup.object().shape({
        title: yup.string()
            .min(1, 'Title must be betwen 1 and 100 characters')
            .max(100, 'Title must be betwen 1 and 100 characters')
            .required('Required'),
        startDate: yup.date()
            .required('Required'),
        endDate: yup.date()
            .required('Required'),
        discount: yup.number()
            .min(0.01, 'Must be at least 1% off')
            .max(1.00, 'Cannot be more than free')
            .required('Required'),
    })
    useEffect(() => {
        async function fetchPromotions(){
            console.log('in fetchPromotions')
            let promotionGetData={
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
            const response = await fetch('http://localhost:3000/api/promotions', promotionGetData)
            const data = await response.json()
            if(data.errors) {
                console.log(data.errors.split(';')) // TODO: Add a set erros hook (see Homepage.js)
            }
            setPromotions(data)
        }
        fetchPromotions()
    })

    const promotionCards = promotions.map(promotion => (
        <>
            <Col key={promotion.title} xs='3' id = "column-hp">
                <Card id = "card-style-hp">
                    <ListGroup id = "lG-hp" className="list-group-flush" >
                        <ListGroupItem id = "lGI-title-hp">
                            <Card.Title>{promotion.title}</Card.Title>
                        </ListGroupItem>
                    </ListGroup>  
                    <ListGroup id = "lG-hp" className="list-group-flush">
                        <ListGroupItem id = "lGI-hp">Start Date: {promotion.startDate.substring(0,promotion.startDate.length - 14)}</ListGroupItem>
                    </ListGroup>
                    <ListGroup id = "lG-hp" className="list-group-flush">
                        <ListGroupItem id = "lGI-hp">End Date: {promotion.endDate.substring(0,promotion.endDate.length - 14)}</ListGroupItem>
                    </ListGroup>
                    <ListGroup id = "lG-hp" className="list-group-flush">
                        <ListGroupItem id = "lGI-hp">Discount: {promotion.discount * 100}%</ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </>

    ))

    return(
        <div id = "background">
            <StoreNavbar/> 
            <h1 id = "h1-style-cart">Manage Promotions</h1>
            <Row lg={3} >
                {promotionCards}
            </Row>
            <Formik
                enableReinitialize
                initialValues={{
                    title: '',
                    startDate: '',
                    endDate: '',
                    discount: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (data) => {
                    let promotionData={
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
                            'startDate': data.startDate,
                            'endDate': data.endDate,
                            'title': data.title,
                            'discount': data.discount
                        })
                    }
                    const promotionResponse = await (await fetch('http://localhost:3000/api/promotions', promotionData)).json()
                    if(promotionResponse.errors) {
                        console.log(promotionResponse.errors.split(';'))
                    }
                    else {
                        console.log('no errors')
                    }                   
                }}
            >{({
                    handleSubmit,
                    handleChange, 
                    handleBlur,
                    submitForm,
                    values,
                    // eslint-disable-next-line no-unused-vars
                    touched,
                    // eslint-disable-next-line no-unused-vars
                    errors,
                    // eslint-disable-next-line no-unused-vars
                    dirty,
                    // eslint-disable-next-line no-unused-vars
                    isValid
                }) => ( 
                    <Form id = "form-style-profile" onSubmit={handleSubmit}>
                        <h1>Enter New Promotion</h1>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Promotion Title</Form.Label>
                                <Form.Control
                                    name = 'title' 
                                    placeholder = 'PROMOTITLE'
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.title && !errors.title}
                                    isInvalid={touched.title && errors.title}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control 
                                    name='startDate'
                                    type='date'
                                    value={values.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.startDate && !errors.startDate}
                                    isInvalid={touched.startDate && errors.startDate}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control 
                                    name='endDate'
                                    type='date'
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.endDate && !errors.endDate}
                                    isInvalid={touched.endDate && errors.endDate}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Discount</Form.Label>
                                <Form.Control 
                                    name='discount'
                                    placeholder='0.20'
                                    value={values.discount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.discount && !errors.discount}
                                    isInvalid={touched.discount && errors.discount}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button 
                                variant="primary" 
                                disabled={!(dirty && isValid)}
                                onClick={submitForm}
                            >
                            Submit
                            </Button>
                        </Form.Row> 
                    </Form>
                )}</Formik>
        </div> 
    )
}
export default ManagePromotions