import React, {useState, useEffect} from 'react'
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NumericInput from 'react-numeric-input'

import StoreNavbar from './StoreNavbar'
import './styles/Cart.css' 
import './styles/Background.css'

function Cart(){

    const [carts, setCart] = useState([])

    async function fetchCart(){
        let cartGetData={
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
        const response = await fetch('http://localhost:3000/api/cart', cartGetData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) // TODO: Add a set erros hook (see Homepage.js)
        }
        await setCart(data)
        console.log(data)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    async function deleteCart (event) {

        let cartIndex = event.target.value
        let bookID = carts[cartIndex].book._id
        let quantity = carts[cartIndex].bookQuantity

        console.log(cartIndex)
        console.log(bookID)
        console.log(quantity)

        let bookData={
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
                'bookID': bookID,
                'quantity': quantity
            })
        }

        let userResponse = await (await fetch('http://localhost:3000/api/cart', bookData)).json()

        if(userResponse.errors) {
            console.log(userResponse.errors.split(';'))
        }
        else {
            console.log('no errors')
        } 

        await fetchCart()

    }

    console.log(carts)

    const cartRows = carts.map((cartItem, cartIndex) => (
        <Row className = "row-list-cart" key = {cartItem.book}>
            <Col className = "col-cover-cart"> 
                <img id = "img-cart" src={cartItem.book.cover} alt={cartItem.title} /> 
            </Col>
            <Col className = "col-list-cart"> 
                <Row> <h3>{cartItem.book.title}</h3></Row>
                <Row> {cartItem.book.author}</Row>

            </Col>
            <Col className = "col-quantity-cart">
                <Form id = "num-form-cart">
                    <NumericInput 
                        id="quant-select-cart" 
                        placeholder={cartItem.bookQuantity} 
                        min={0} 
                        max={100} 
                        value={1}
                    />
                </Form> 
            </Col>
            <Col className = "col-price-cart"> 
                $ {cartItem.book.sellPrice}
            </Col>
            <Col className = "col-delete-cart">
                <div>
                    <Button 
                        id="delete-but-cart"
                        variant="danger" 
                        value = {cartIndex}
                        onClick = {async (event) => {await deleteCart(event)}}

                    >
                        X
                    </Button>
                </div>
            </Col>
        </Row>
    ))
        
    

    


    let sum = 0
    carts.forEach(cartItem => {
        sum = sum + (cartItem.book.sellPrice)
    })
    console.log(sum)


    return(
        <div id = "background">
            <StoreNavbar/> 
            <h1 id = "h1-style-cart">Cart</h1>
            <Container className = "main-cont-cart">
                <div>
                    {cartRows}
                </div>
                <div>
                    <Row id = "row-subtotal-cart">
                        <div id = "subtotal-title-cart"> Subtotal </div>
                        <div id = "subtotal-price-cart"> $ {sum}</div>
                    </Row>
                </div>
                <div>
                    <Row id = "row-but-cart">
                        <Link to='/user/checkout'>
                            <Button variant="primary" type="submit" id = "button-style-cart">
                            Proceed to Checkout
                            </Button>
                        </Link>
                    </Row>
                </div>
            </Container>
        </div>      
    )
}

export default Cart