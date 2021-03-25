/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Container } from 'react-bootstrap'

import UserNav from './UserNav'
import '../styles/User.css'
//import { booksData } from '../../data/books'

function User(){

    const cardStyle = {
        padding: '3%',
        width: '100%',
        height: '100%'
    }

    const lG = {
        padding: '2%',
    }

    const lG4 = {
        padding: '2%',
        textAlign: 'center',
    }

    const topBuffer = {
        marginTop: '20px'
    }

    // keep books in state
    const [books, setBooks] = useState([])

    // when component renders, put this data from ../../data/books into state (array of JSON objects)
    useEffect(() => {
        async function fetchBooks(){
            const response = await fetch('http://localhost:3000/api/books')
            const data = await response.json()
            setBooks(data)
        }
        fetchBooks()
    }, [])

    console.log(books)
    const bookCards = books.map(book => (
        <Col style={topBuffer} key={book.isbn} xs='3'>
            <Card style={cardStyle}>
                <Card.Img variant="top" src={book.cover} />
                <ListGroup style={lG}  className="list-group-flush">
                    <ListGroupItem>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                    </ListGroupItem>
                </ListGroup>  
                <ListGroup style={lG} className="list-group-flush">
                    <ListGroupItem>Author: {book.author}</ListGroupItem>
                </ListGroup>
                <ListGroup style={lG} className="list-group-flush">
                    <ListGroupItem>Price: {book.Price}</ListGroupItem>
                </ListGroup>
                <ListGroup style={lG4} className="list-group-flush">
                    <ListGroupItem>
                        <Card.Link href={book.website}>More Info</Card.Link>
                        <Card.Link href="">Add To Cart</Card.Link>
                    </ListGroupItem>                   
                </ListGroup>
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
