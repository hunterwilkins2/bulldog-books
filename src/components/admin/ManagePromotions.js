import {React, useEffect, useState} from 'react'
import { Formik } from 'formik'
import {Button, Card, Col, ListGroup, ListGroupItem, Form, Row, Alert} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import * as yup from 'yup'
import Cookies from 'js-cookie'
import moment from 'moment'

import StoreNavbar from '../StoreNavbar'

import './../styles/ManagePromos.css'

function ManagePromotions(){
    const [promotions, setPromotions] = useState([])
    const [errors, setErrors] = useState([])

    const currentDate = moment().format('YYYY-MM-DD')

    const alerts = errors.map(error => 
        <Alert key={error} variant='danger'>
            {error}
        </Alert>
    )

    const validationSchema = yup.object().shape({
        title: yup.string()
            .min(1, 'Title must be betwen 1 and 100 characters')
            .max(100, 'Title must be betwen 1 and 100 characters')
            .required('Required'),
        startDate: yup.date()
            .min(currentDate)
            .required('Required'),
        endDate: yup.date()
            .min(yup.ref('startDate'))
            .required('Required'),
        discount: yup.number()
            .min(0.01, 'Must be at least 1% off')
            .max(1.00, 'Cannot be more than free')
            .required('Required'), 
        isSent: yup.boolean().required()
    })

    async function fetchPromotions(){
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
            console.log(data.errors.split(';')) 
            setErrors(data.errors.split(';'))
        }
        await setPromotions(data)
    }

    useEffect(() => {
        fetchPromotions()
    }, [])

    async function handleEmail(event){
        let promoSendData={
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
                'id': promotions[event.target.value]._id
            })
        }
        const response = await fetch('http://localhost:3000/api/promotions/send-promotion', promoSendData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) 
            setErrors(data.errors.split(';'))
        }
        await fetchPromotions()
    }
    async function handleDelete(event){
        console.log(promotions[event.target.value]._id)

        let promotionDeleteData={
            method: 'DELETE',
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
                'id': promotions[event.target.value]._id
            })
        }
        const response = await fetch('http://localhost:3000/api/promotions', promotionDeleteData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) 
            setErrors(data.errors.split(';'))
        }
        await fetchPromotions()
    }

    const promotionCards = promotions.map((promotion, promotionIndex) => (

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
                    <ListGroup >
                        <div id = "lG-buttons-mp">
                            <div>
                                <Link to={{ pathname: '/admin/UpdatePromo', state: { promotion: promotion} }}>
                                    <Button className = "but-mp"
                                        variant="primary" 
                                        onClick={console.log('show!')}
                                        disabled={promotion.isSent}
                                        value={promotionIndex}
                                    >
                                        Update
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Button className = "but-mp"
                                    disabled={promotion.isSent}
                                    onClick={async (event) => {await handleDelete(event)}}
                                    value={promotionIndex}
                                >
                                    Delete
                                </Button>
                            </div>
                            <div>
                                <Button className = "but-mp"
                                    disabled={promotion.isSent}
                                    onClick={async (event) => {await handleEmail(event)}}
                                    value={promotionIndex}
                                >Email</Button>
                            </div>
                        </div>
                    </ListGroup>

                </Card>
            </Col>
        </>

    ))

    return(
        <div id = "background">
            <StoreNavbar/> 
            {Cookies.get('userType') !== 'admin' && <Redirect to='/'/>}
            <h2 id = "h2-style-cart">Manage Promotions</h2>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            title: '',
                            startDate: '',
                            endDate: '',
                            discount: '',
                            isSent: false
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
                                    'discount': data.discount,
                                    'isSent': data.isSent
                                })
                            }
                            const promotionResponse = await (await fetch('http://localhost:3000/api/promotions', promotionData)).json()
                            if(promotionResponse.errors) {
                                console.log(promotionResponse.errors.split(';'))
                                setErrors(promotionResponse.errors.split(';'))
                            }
                            else {
                                console.log('no errors')
                            }    
                            
                            fetchPromotions()
                        }}
                    >{({
                            handleSubmit,
                            handleChange, 
                            handleBlur,
                            submitForm,
                            values,
                            touched,
                            errors,
                            dirty,
                            isValid
                        }) => ( 
                            <Form id = "form-style-profile" onSubmit={handleSubmit}>
                                <h3 id = "form-title-mp">Enter New Promotion</h3>
                                {alerts}
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label className = "form-label-mp">Promotion Title</Form.Label>
                                        <Form.Control className = "control-label-mp"
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
                                        <Form.Label className = "form-label-mp">Start Date</Form.Label>
                                        <Form.Control className = "control-label-mp"
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
                                        <Form.Label className = "form-label-mp">End Date</Form.Label>
                                        <Form.Control className = "control-label-mp"
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
                                        <Form.Label className = "form-label-mp">Discount</Form.Label>
                                        <Form.Control className = "control-label-mp"
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
                                    <Form.Group id = "form-check-mp" as={Col}>
                                        <Form.Check 
                                            name='isSent'
                                            label="Send Promotion Now"
                                            value={values.isSent}
                                            checked={values.isSent}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                </Col>
            </Row>
            <h2 id = "promo-card-title-mp"> Current and Past Promotions </h2>
            <Row id = "promocard-cont-mp" >
                {promotionCards}
            </Row>
            
        </div> 
    )
}
export default ManagePromotions

