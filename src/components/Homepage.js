/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Container } from 'react-bootstrap'

import UserNav from './UserNav.js'

import Promos from  './Promos'
import BestSellers from './BestSeller'
// import StoreNavbar from './StoreNavbar'
// import { booksData } from '../data/books'
import './styles/Homepage.css'
import './styles/Background.css'


function User(){

    const [books, setBooks] = useState([])

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
        <>
            <Col  key={book.isbn} xs='3' id = "column">
                <Card id = "card-style">
                    <Card.Img variant="top" src={book.image} />
                    <ListGroup id = "lG"  className="list-group-flush"/>
                </Card>
            </Col>
            <Col key={book.isbn} xs='3'>
                <Card>
                    <Card.Img variant="top" src={book.cover} />
                    <ListGroup className="list-group-flush" >
                        <ListGroupItem>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                        </ListGroupItem>
                    </ListGroup>  
                    <ListGroup id = "lG" className="list-group-flush">
                        <ListGroupItem>Author: {book.author}</ListGroupItem>
                    </ListGroup>
                    <ListGroup id = "lG" className="list-group-flush">
                        <ListGroupItem>Price: {book.Price}</ListGroupItem>
                    </ListGroup>
                    <listGroup id = "lG" className="list-group-flush"/>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Card.Link href={book.website}>More Info</Card.Link>
                            <Card.Link href="">Add To Cart</Card.Link>
                        </ListGroupItem>                   
                    </ListGroup>
                </Card>
            </Col>
        </>

    ))

    return (
        <div id = "background">
            <UserNav/> 
            <Container id = "cont">
                <Row className ="mx-auto" id = "promo-bestseller-row">
                    <Col className ="mx-auto" id = "col-onsale"> 
                        <div className="text-danger" id = "title"> On Sale </div>
                        <Promos/> 
                    </Col>
                    <Col className ="mx-auto" id = "col-bestseller">
                        <div className="text-white" id = "title"> Best Sellers </div> 
                        <BestSellers/>
                    </Col>
                </Row>
                <Row className = "mx-auto" lg={3} id = "book-rows" >
                    {bookCards}
                </Row>
            </Container>
        </div>
    )

    
}

export default User