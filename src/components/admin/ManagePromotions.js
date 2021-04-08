import { Formik } from 'formik'
import {Button, React, useState, useEffect} from 'react'
import {Col, Form} from 'react-bootstrap'

import StoreNavbar from '../StoreNavbar'

function ManagePromotions(){
    const [promotions, setPromotions] = useState([])

    useEffect(() => {
        async function fetchPromotions(){
            const response = await fetch('http://localhost:3000/api/promotions') // TODO: implement this route
            const data = await response.json()
            if(data.errors) {
                console.log(data.errors.split(';')) // TODO: Add a set erros hook (see Homepage.js)
            }
            setPromotions(data)
        }
        fetchPromotions
    })
    console.log(promotions)

    // TODO: implement promotionCards
    //const promotionCards = promotions.map(book => ())

    // TODO: render promotionCards
    return(
        <div id = "background">
            <StoreNavbar/> 
            <h1 id = "h1-style-cart">Manage Promotions</h1>
            <Formik
                enableReinitialize
                initialValues={{
                    title: '',
                    date: '',
                    discount: '',
                }}
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
                            'title': data.title,
                            'date': data.date,
                            'discount': data.discount
                        })
                    }
                    const promotionResponse = await (await fetch('http://localhost:3000/api/promotion', promotionData)).json()
                    if(promotionResponse.errors) {
                        console.log(promotionResponse.errors.split(';'))
                    }
                    else {
                        console.log('no errors')
                    }
                    // TODO: add validation schema
                    
                }}
            >{({
                    // eslint-disable-next-line no-unused-vars
                    handleSubmit,
                    // eslint-disable-next-line no-unused-vars
                    handleChange, 
                    // eslint-disable-next-line no-unused-vars
                    handleBlur,
                    // eslint-disable-next-line no-unused-vars
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
                    <Form id = "form-style-profile">
                        <h1>Enter New Promotion</h1>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Promotion Title</Form.Label>
                                <Form.Control id = "form-control-profile"></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control id = "form-control-profile"></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Discount</Form.Label>
                                <Form.Control id = "form-control-profile"></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button>
                                Button
                            </Button>
                        </Form.Row> 
                    </Form>
                )}</Formik>
        </div> 
    )
}
export default ManagePromotions