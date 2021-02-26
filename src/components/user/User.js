/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Container } from 'react-bootstrap'

import UserNav from './UserNav'
import '../styles/User.css'
import { booksData } from '../../data/books'

function User(){

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
        setBooks(booksData)
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
                    <Card.Link href={book.website}>More Info</Card.Link>
                    <Card.Link href="">Add To Cart</Card.Link>                
                </Card.Body>
            </Card>
        </Col>
    ))

    return (
        <div>
            <UserNav/> 
            <Container>
                <Row className="mx-auto" lg={3} >
                    {bookCards}
                </Row>
            </Container>
        </div>
    )
}

export default User
