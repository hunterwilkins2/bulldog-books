import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NumericInput from 'react-numeric-input'

import UserNav from './UserNav'
import { booksData } from '../../data/books'

function Cart(){

    let orderData = booksData.slice(1,4)

    
    const cardStyle ={ 
        padding: '5%',
        width: '100%',
        height: '90%'
    }

    const cardImage = {
        height: '50%'
    }

    const h1Style = {
        fontSize: '2.5em'
    }

    const buttonStyle={
        margin: '10px'
    }

    const colStyle = {
        margin: '0px'
    }

    const rowStyle = {
        margin: '0px'
    }

    
    // keep books in state
    const [books, setBooks] = useState([])

    // when component renders, put this data from ../../data/books into state (array of JSON objects)
    useEffect(() => {
        setBooks(orderData)
    }, [])

    const bookCards = books.map(book => (
        <Col style={colStyle} key={book.isbn} xs='3'>
            <Card style={cardStyle}>
                <Card.Img variant="top" src={book.image} style={cardImage} />
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
        <div>
            <UserNav/> 
            <h1 style={h1Style}>Cart</h1>
            <Container>
                <Row className="mx-auto" lg={3} style={rowStyle}>
                    {bookCards}
                </Row>
                <Link to='/user/checkout'>
                    <Button variant="primary" type="submit" style = {buttonStyle}>
                            Proceed to Checkout
                    </Button>
                </Link>
            </Container>
        </div>       
    )
}

export default Cart