import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import UserNav from './UserNav'
import { booksData } from '../../data/books'

function Cart(){
    let orderData = booksData.slice(1,4)
    const cardStyle = {
        padding: '10px',
        width: '18rem',
        height: '35rem'
    }

    const topBuffer = {
        marginTop: '20px'
    }

    // keep books in state
    const [books, setBooks] = useState([])

    // when component renders, put this data from ../../data/books into state (array of JSON objects)
    useEffect(() => {
        setBooks(orderData)
    }, [])

    const bookCards = books.map(book => (
        <Col style={topBuffer} key={book.isbn} xs='3'>
            <Card style={cardStyle}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                </Card.Body>  
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Author: {book.author}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button>Remove From Cart</Button>
                </Card.Body>
            </Card>
        </Col>
    ))
    return(
        <div>
            <UserNav/> 
            <h1>Your Order</h1>
            <Container>
                <Row className="mx-auto" lg={3} >
                    {bookCards}
                </Row>
                <Row>
                    <Link to='checkout'>Checkout</Link>
                </Row>
            </Container>
        </div>       
    )
}

export default Cart