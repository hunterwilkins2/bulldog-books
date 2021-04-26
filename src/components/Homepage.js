/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Container, Alert, Button, Modal } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

// import Promos from  './Promos'
import BestSellers from './BestSeller'
import NewReleases from './NewReleases'
import StoreNavbar from './StoreNavbar'

import './styles/Homepage.css'
import './styles/Background.css'


function HomePage(){
    const [errors, setErrors] = useState([])

    const alerts = errors.map(error => 
        <Alert key={error} variant='danger'>
            {error}
        </Alert>
    )

    const [books, setBooks] = useState([])

    async function fetchBooks(){
        let booksGetData={
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        const response = await fetch('http://localhost:3000/api/books', booksGetData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) 
            setErrors(data.errors.split(';'))
        }
        await setBooks(data)
        console.log(data)
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    async function handleDelete(isbn){
        // console.log(books[event.target.value].isbn)
        // console.log(isbn)

        let booksDeleteData={
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        const response = await fetch(`http://localhost:3000/api/books/${isbn}`, booksDeleteData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) 
            setErrors(data.errors.split(';'))
        }
        await fetchBooks()
    }

    const [show, setShow] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const bookCards = books.map((book) => (
        <Col key={book.isbn} xs='3' id = "column-hp">
            <Card id = "card-style-hp">
                <Card.Img className = "mx-auto" id = "image-hp" src={book.cover} />
                <ListGroup id = "lG-hp" className="list-group-flush" >
                    <ListGroupItem id = "lGI-title-hp">
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                    </ListGroupItem>
                </ListGroup>  
                <ListGroup id = "lG-hp" className="list-group-flush">
                    <ListGroupItem id = "lGI-hp">Author: {book.author}</ListGroupItem>
                </ListGroup>
                <ListGroup id = "lG-hp" className="list-group-flush">
                    <ListGroupItem id = "lGI-hp">Price: ${book.sellPrice}</ListGroupItem>
                </ListGroup>
                <ListGroup className="list-group-flush">
                    <ListGroupItem id = "lGI-links-hp">
                        {Cookies.get('userType') === 'admin' && 
                            <div>
                                <Link to={{ pathname: '/admin/EditBook', state: { book: book} }}>
                                    <Button className = "but-mb-hp"
                                        variant="primary" 
                                        onClick={console.log('show!')}
                                        value={book.isbn}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button className = "but-mb-hp" value = {book.isbn}  onClick={() => handleDelete(book.isbn)} > Delete </Button>
                            </div>
                        }
                        {Cookies.get('userType') !== ('admin') &&
                            <div>
         
                                <Button id = "button-mib-hp" variant="primary" onClick={handleShow} >
                                        More Info
                                </Button>
  
                                <Modal show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header>
                                        Book Information
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Row>
                                            <Col>
                                                    Title:
                                            </Col>
                                            <Col>
                                                {book.title}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Author:
                                            </Col>
                                            <Col>
                                                {book.author}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Edition:
                                            </Col>
                                            <Col>
                                                {book.edition}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Category:
                                            </Col>
                                            <Col>
                                                {book.category}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    ISBN:
                                            </Col>
                                            <Col>
                                                {book.isbn}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Quantity in Stock:
                                            </Col>
                                            <Col>
                                                {book.quantity}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Price:
                                            </Col>
                                            <Col>
                                                    ${book.sellPrice}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Publication Date:
                                            </Col>
                                            <Col>
                                                {book.publicationDate.substring(0,10)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                    Publisher:
                                            </Col>
                                            <Col>
                                                {book.publisher}
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer >
                                        <Row>
                                            <Button variant="danger" onClick={handleClose}>
                                                    Close
                                            </Button>
                                        </Row>
                                    </Modal.Footer>
                                </Modal>
                            
                                <Card.Link href="">Add To Cart</Card.Link>
                            </div>
                        }
                    </ListGroupItem>                   
                </ListGroup>
            </Card>
        </Col>

    ))


    return (
        <div id = "background">
            <StoreNavbar homePage={true}/> 
            {alerts}
            <Container id = "cont-hp">
                {Cookies.get('userType') !== 'admin' &&
                <Row className ="mx-auto" id = "promo-bestseller-row-hp">
                    <Col className ="mx-auto" id = "col-onsale-hp"> 
                        <div className="text-danger" id = "title-hp"> New Releases </div>
                        <NewReleases/> 
                    </Col>
                    <Col className ="mx-auto" id = "col-bestseller-hp">
                        <div className="text-white" id = "title-hp"> Best Sellers </div> 
                        <BestSellers/>
                    </Col>
                </Row>
                }
                <Row lg={3} >
                    {bookCards}
                </Row>
            </Container>       
        </div>
    )

    
}

export default HomePage
