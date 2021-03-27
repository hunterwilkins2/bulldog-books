import React from 'react'
import {Button, Card, Col, Container, Form, Row, ListGroup} from 'react-bootstrap'

import StoreNavbar from '../StoreNavbar'
import { booksData } from '../../data/books'
import './../styles/Checkout.css' 
import './../styles/Background.css'

function Checkout(){
    let orderData = booksData.slice(1,4)
    let total = 0
    for (let i = 0; i < orderData.length; i++) {
        total += 12 // should change to price when that becomes part of bookData
    }
    let tax = total * 0.1
    let delivery = 8
    let grand_total = total + tax + delivery
    console.log(grand_total)

    

    // const orderSummaryEntries = orderData.map(book => (
    //     <Card.Body key={book.isbn}>
    //         {book.title}....................1x$12
    //     </Card.Body>
    // ))

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
                        <h2 id = "h2-checkout">Order Summary</h2>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Learning JavaScript Design Patterns: $23.21</ListGroup.Item>
                                <ListGroup.Item>Speaking JavaScript: $45.73</ListGroup.Item>
                                <ListGroup.Item>Programming JavaScript Applications: $12.43</ListGroup.Item>
                                <ListGroup.Item>Total: $81.37 </ListGroup.Item>
                                <ListGroup.Item>Tax: $3.25 </ListGroup.Item>
                                <ListGroup.Item>Delivery Fee: $8.00 </ListGroup.Item>
                                <ListGroup.Item>Grand Total: $92.62 </ListGroup.Item>
                            </ListGroup>
                        </Card>
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
                    </Col>
                </Row>
            </Container>
        </div>  
    )
}

export default Checkout