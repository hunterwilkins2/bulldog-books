import React, {useState, useEffect} from 'react'
import {Button, Card, Col, Container, Form, Row, ListGroup} from 'react-bootstrap'



import StoreNavbar from './StoreNavbar'
import './styles/Checkout.css' 
import './styles/Background.css'

function Checkout(){

    const [orderItems, setOrderItems] = useState([])

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
        fetchBooks()
    }, [])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const orderSummaryItems = orderItems.map((item) => (
        <>
            <ListGroup.Item key={item} id = "li">
                <Col id = "col1">
                    {item.book.title} ({item.bookQuantity}):                                   
                </Col>
                <Col id = "col2">
                    {formatter.format(item.book.sellPrice * item.bookQuantity)}                            
                </Col>
                                                
            </ListGroup.Item>
        </>
    ))

    let total = 0
    orderItems.forEach(cartItem => {
        total = total + (cartItem.book.sellPrice * cartItem.bookQuantity)
    })

    let tax = total * .04

    let delfee = 8

    console.log('checkout')
    return(
        <div id = "background">
            <StoreNavbar/> 
            <h1 id = "title-checkout">Checkout</h1>
            <Container id = "main-cont-checkout">
                <Row>
                    <Col>
                        <h2 id = "h2-checkout">Delivery Information</h2>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control placeholder="Jane" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Doe" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment Number, PO Box" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>ZIP</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <h2 id = "h2-checkout">Billing Information</h2>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control placeholder="Jane" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Doe" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment Number, PO Box" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>ZIP</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col>                                    
                        
                        <Row>
                            <h2 id = "h2-checkout">Order Summary</h2>
                            <Row id = "mainrow">
                                <Col id = "maincol">
                                    <Card id = "card1">
                                        <ListGroup variant="flush">
                                            {orderSummaryItems}
                                            <ListGroup.Item id = "li">
                                                <Col id = "col1">
                                                    Total:                                   
                                                </Col>
                                                <Col id = "col2">
                                                    {formatter.format(total)}                            
                                                </Col>
                                            </ListGroup.Item>
                                            <ListGroup.Item id = "li">
                                                <Col id = "col1">
                                                    Tax:                                   
                                                </Col>
                                                <Col id = "col2">
                                                    {formatter.format(tax)}                            
                                                </Col>
                                            </ListGroup.Item>
                                            <ListGroup.Item id = "li">
                                                <Col id = "col1">
                                                    Delivery Fee:                                   
                                                </Col>
                                                <Col id = "col2">
                                                    {formatter.format(delfee)}                           
                                                </Col>
                                            </ListGroup.Item>
                                            <ListGroup.Item id = "li">
                                                <Col id = "col1">
                                                    GRAND TOTAL                                   
                                                </Col>
                                                <Col id = "col2">
                                                    {formatter.format(total + tax + delfee)}                            
                                                </Col>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <h2 id = "h2-checkout">Payment Information</h2>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Credit Card Number</Form.Label>
                                    <Form.Control placeholder='0123 456789 01234' />
                                </Form.Group>  
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Expiration Date</Form.Label>
                                        <Form.Control as="select" defaultValue="Month">
                                            <option>Month</option>
                                            <option>01</option>
                                            <option>02</option>
                                            <option>03</option>
                                            <option>04</option>
                                            <option>05</option>
                                            <option>06</option>
                                            <option>07</option>
                                            <option>08</option>
                                            <option>09</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label></Form.Label>
                                        <Form.Control as="select" defaultValue="Year">
                                            <option>Year</option>
                                            <option>21</option>
                                            <option>22</option>
                                            <option>23</option>
                                            <option>24</option>
                                            <option>25</option>
                                            <option>26</option>
                                            <option>27</option>
                                            <option>28</option>
                                            <option>29</option>
                                            <option>30</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>ZIP</Form.Label>
                                        <Form.Control />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                            <Button>Submit</Button>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </div>  
    )
}

export default Checkout