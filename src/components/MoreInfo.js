/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Card, Col, ListGroup, ListGroupItem, Form, Row, Alert, Image } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { Formik } from 'formik'
import './styles/MoreInfo.css'

import StoreNavbar from './StoreNavbar'

class MoreInfo extends React.Component {

    render() {

        const {book} = this.props.location.state

        let date = new Date(book.publicationDate)
        console.log(date.toDateString())

        return (
            <>
                <StoreNavbar/>
                <div className = "cont" id = "background">
                    <div className='info-cont'>
                        <Card className='card'>
                            <Card.Img className='cardImg' src={book.cover} />
                            <ListGroup id = "lG-hp" className="list-group-flush" >
                                <ListGroupItem id = "lGI-title-hp">
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Subtitle className="text-muted">{book.subtitle}</Card.Subtitle>
                                </ListGroupItem>
                            </ListGroup>  
                            <ListGroup id = "lG-hp" className="list-group-flush">
                                <ListGroupItem id = "lGI-hp">Author: {book.author}</ListGroupItem>
                                <ListGroupItem id = "lGI-hp">Edition: {book.edition}</ListGroupItem>
                                <ListGroupItem id = "lGI-hp">Category: {book.category}</ListGroupItem>
                                <ListGroupItem id = "lGI-hp">ISBN: {book.isbn}</ListGroupItem>
                                <ListGroupItem id = "lGI-hp">Publisher: {book.publisher}</ListGroupItem>
                                <ListGroupItem id = "lGI-hp">Publication Date: {date.toDateString()}</ListGroupItem>
                                <ListGroupItem id = "lGI-hp">Price: ${book.sellPrice}</ListGroupItem>
                            </ListGroup>
                        </Card>
                        <Row>
                            <Link to='/'>
                                <Button id='back-button'>Back</Button>
                            </Link>
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}

export default MoreInfo