/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Container, Alert, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'

// import Promos from  './Promos'
import StoreNavbar from '../StoreNavbar'
import ManageBooksPopup from './ManageBooksPopup'
import '../styles/Admin.css'
import '../styles/Background.css'

function Admin(){

    const [errors, setErrors] = useState([])

    const alerts = errors.map(error => 
        <Alert key={error} variant='danger'>
            {error}
        </Alert>
    )

    const [books, setBooks] = useState([])

    useEffect(() => {
        async function fetchBooks(){
            const response = await fetch('http://localhost:3000/api/books')
            const data = await response.json()
            if(data.errors) {
                setErrors(data.errors.split(';'))
            }
            setBooks(data)
        }
        fetchBooks()
    }, [])

    const [showPopup, setShowPopup] = useState(false)
    const [popupBook, setPopupBook] = useState(null)
    function makePopup(book) {
        setShowPopup(true)
        setPopupBook(book)
    }
    const closePopup = () => setShowPopup(false)

    const bookCards = books.map(book => (
        <Col key={book.isbn} xs='3' id = "column-ad">
            <Card id = "card-style-ad">
                <Card.Img className = "mx-auto" id = "image-ad" src={book.cover} />
                <ListGroup id = "lG-ad" className="list-group-flush" >
                    <ListGroupItem id = "lGI-title-ad">
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                    </ListGroupItem>
                </ListGroup>  
                <ListGroup id = "lG-ad" className="list-group-flush">
                    <ListGroupItem id = "lGI-ad">Author: {book.author}</ListGroupItem>
                </ListGroup>
                <ListGroup id = "lG-ad" className="list-group-flush">
                    <ListGroupItem id = "lGI-ad">Price: ${book.buyPrice}</ListGroupItem>
                </ListGroup>
                <ListGroup className="list-group-flush">
                    <ListGroupItem id = "lGI-links-ad">
                        {Cookies.get('userType') === 'admin' && 
                             <Button id = "but-mb-ad" onClick={() => makePopup(book)} >Edit Books</Button>
                        }
                        <Card.Link href={book.website}>More Info</Card.Link>
                        <Card.Link href="">Add To Cart</Card.Link>
                    </ListGroupItem>                   
                </ListGroup>
            </Card>
        </Col>

    ))

    const manageBooksBar = (
        <div id = "adddel-innercont-ad">
            <div id = "titlecont-ad">
                <h2>Manage Books</h2>
            </div>
            <div id = "buttoncont-ad">
                <Button href = "/admin/AddBook"  >
                    Add Book
                </Button>
                <Button>
                    Delete Book
                </Button>
            </div>
        </div>
    )

    return (
        <div id = "background">
            <StoreNavbar homePage={true}/> 
            {alerts}
            <div id = "adddel-outtercont-ad">
                {manageBooksBar}
            </div>
            <Container id = "cont-ad">
                <Row lg={3} >
                    {bookCards}
                </Row>
            </Container>
            <ManageBooksPopup show={showPopup} book={popupBook} close={closePopup}></ManageBooksPopup>

        </div>
    )

    
}

export default Admin