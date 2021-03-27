import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NumericInput from 'react-numeric-input'

import StoreNavbar from '../StoreNavbar'
import { booksData } from '../../data/books'
import './../styles/Cart.css' 
import './../styles/Background.css'

function Cart(){

    let orderData = booksData.slice(1,4)

    // keep books in state
    const [books, setBooks] = useState([])

    // when component renders, put this data from ../../data/books into state (array of JSON objects)
    useEffect(() => {
        setBooks(orderData)
    }, [])

    const bookCards = books.map(book => (
        <Col id = "col-style-cart" key={book.isbn} xs='3'>
            <Card id = "card-style-cart">
                <Card.Img variant="top" src={book.image} id = "card-image-cart" />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                </Card.Body>  
                <ListGroup className="list-group-flush" >
                    <ListGroupItem>Author: {book.author}</ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <NumericInput min={0} max={100} value={1}/>
                        </Form.Group>
                    </Form> 
                </ListGroup>
                <ListGroup>
                    <Button>Remove From Cart</Button> 
                </ListGroup>
     
            </Card>
        </Col>
    ))
    return(
        <div id = "background">
            <StoreNavbar/> 
            <h1 id = "h1-style-cart">Cart</h1>
            <Container>
                <Row className="mx-auto" lg={3} id = "row-style-cart">
                    {bookCards}
                </Row>
                <Link to='/user/checkout'>
                    <Button variant="primary" type="submit" id = "button-style-cart">
                            Proceed to Checkout
                    </Button>
                </Link>
            </Container>
        </div>      
    )
}

export default Cart