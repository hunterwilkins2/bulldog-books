/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import UserNavbar from './UserNavbar'
import { Card, ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap'

import '../styles/User.css'
import { booksData } from '../../data/books'

function User(){

    const cardStyle = {
        padding: '10px',
        width: '18rem',
    }

    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(booksData)
    }, [])

    const bookCards = books.map(book => (
        <Col key={book.isbn} xs='3'>
            <Card style={cardStyle}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle>{book.subtitle}</Card.Subtitle>
                </Card.Body>  
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Author: {book.author}</ListGroupItem>
                    <ListGroupItem>Pages: {book.pages}</ListGroupItem>
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
            <UserNavbar />
            <Row>
                {bookCards}
            </Row>
        </div>
    )
}

export default User