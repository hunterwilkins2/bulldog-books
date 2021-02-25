import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Container, Button} from 'react-bootstrap'
import ManageBooksPopup from '../ManageBooksPopup'

import AdminNav from './AdminNav'
import '../styles/Admin.css'
import { booksData } from '../../data/books'

function Admin(){

    const [showPopup, setShowPopup] = useState(false)
    const [popupBook, setPopupBook] = useState(null)
    function makePopup(book) {
        setShowPopup(true)
        setPopupBook(book)
    }
    const closePopup = () => setShowPopup(false)


    const cardStyle = {
        padding: '10px',
        width: '18rem',
        height: '35rem'
    }

    const topBuffer = {
        marginTop: '20px'
    }

    const [books, setBooks] = useState([])

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
                    <Button onClick={() => makePopup(book)} >Manage Books</Button>                            
                </Card.Body>
            </Card>
        </Col>
    ))
    return (
        <div>
            <AdminNav/>
            <Container>
                <Row className="mx-auto" lg={3} >
                    {bookCards}
                </Row>
            </Container>
            <ManageBooksPopup show={showPopup} book={popupBook} close={closePopup}></ManageBooksPopup>
        </div>
    )
}

export default Admin