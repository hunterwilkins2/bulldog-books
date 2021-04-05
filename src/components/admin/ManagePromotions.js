import {React, useState, useEffect} from 'react'
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
                
            </Form>
        </div> 
    )
}
export default ManagePromotions