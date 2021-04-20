/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Card, Col, ListGroup, ListGroupItem, Form, Row, Alert} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { Formik } from 'formik'
import '../styles/Login.css'

import StoreNavbar from '../StoreNavbar'


class UpdatePromo extends React.Component {

    render() {


        const {promotion} = this.props.location.state

        console.log(promotion) // "bar"

        return (
            <>
                <StoreNavbar/>
                <div className = "cont" id = "background">
                    <Formik 
                        initialValues={{title: promotion.title, startDate: promotion.startDate, endDate: promotion.endDate, discount: promotion.discount}} 
                        onSubmit={async (data, {setSubmitting}) => {
                            console.log(data)

                            let promotionUpdateData={
                                method: 'PATCH',
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
                                    'id': promotion._id,
                                    'startDate': data.startDate,
                                    'endDate': data.endDate,
                                    'title': data.title,
                                    'discount': data.discount
                                })
                            }
                            const promotionUpdateResponse = await (await fetch('http://localhost:3000/api/promotions', promotionUpdateData)).json()
                            if(promotionUpdateResponse.errors) {
                                console.log(promotionUpdateResponse.errors.split(';'))
                            }
                            else {
                                console.log('no errors')
                            }    



                        }}
                    >{({ handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors,
                            setSubmitting
                        }) => (
                            <Form className="login-form" id = "form-style" onSubmit={handleSubmit}>
                                <h1>Update Promo</h1>
                                <Form.Label>Title</Form.Label>
                                <Form.Group >
                                    <Form.Control 
                                        name='title'
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Start</Form.Label>
                                    <Form.Control 
                                        name="startDate"
                                        type="date"
                                        value={values.startDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>End</Form.Label>
                                    <Form.Control 
                                        name="endDate"
                                        type="date"
                                        value={values.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Control 
                                        name='discount'
                                        value={values.discount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                >
                            Submit
                                </Button>
                                <Link to='/admin/ManagePromotions'>
                                    <Button id='back-button'>Back</Button>
                                </Link>
                            </Form>
                        )}</Formik>
                </div>
            </>
        )
    }
}


export default UpdatePromo