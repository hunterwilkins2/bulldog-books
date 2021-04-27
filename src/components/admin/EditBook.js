import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import moment from 'moment'

import StoreNavbar from '../StoreNavbar'
import '../styles/EditBook.css'

function EditBook (book) {

    const currentDate = moment().format('YYYY-MM-DD')
    console.log(currentDate)

    const validationSchema = yup.object().shape({
        title: yup.string()
            .min(1, 'Title must be betwen 1 and 500 characters')
            .max(500, 'Title must be betwen 1 and 500 characters'),
        author: yup.string()
            .min(1, 'Author must be betwen 1 and 200 characters')
            .max(200, 'Author must be betwen 1 and 200 characters'),
        edition: yup.string()
            .min(1, 'Edition must be betwen 1 and 10 characters')
            .max(10, 'Edition must be betwen 1 and 10 characters'),
        category: yup.string()
            .min(1, 'Category must be betwen 1 and 100 characters')
            .max(100, 'Category must be betwen 1 and 100 characters'),
        cover: yup.string()
            .min(1, 'Cover must be betwen 1 and 200 characters')
            .max(500, 'Cover must be betwen 1 and 200 characters'),
        isbn: yup.string()
            .min(10, 'ISBN must be betwen 10 and 13 characters')
            .max(13, 'ISBN must be betwen 10 and 13 characters')
            .matches('^[0-9]*$', 'Can only contain numbers'),
        quantity: yup.string()
            .min(1, 'Quantity must be betwen 1 and 6 digits')
            .max(6, 'Quantity must be betwen 1 and 6 digits')
            .matches('^[0-9]*$', 'Can only contain numbers'),
        threshold: yup.string()
            .min(1, 'ISBN must be betwen 1 and 6 digits')
            .max(6, 'ISBN must be betwen 1 and 6 digits')
            .matches('^[0-9]*$', 'Can only contain numbers'),
        buyPrice: yup.string()
            .min(1, 'buyPrice must be betwen 1 and 10 digits')
            .max(10, 'buyPrice must be betwen 1 and 10 digits')
            .matches('^[0-9 & .]*$', 'Can only contain numbers and decimals'),
        sellPrice: yup.string()
            .min(1, 'sellPrice must be betwen 1 and 10 digits')
            .max(10, 'sellPrice must be betwen 1 and 10 digits')
            .matches('^[0-9 & .]*$', 'Can only contain numbers and decimals'),
        publicationDate: yup.date()
            .max(currentDate, 'Cannot choose a future date'),
        publisher: yup.string()
            .min(1, 'Publisher must be betwen 1 and 200 characters')
            .max(200, 'Publisher must be betwen 1 and 200 characters')

    })

    
    return (
        <>
            <StoreNavbar/>
            <div className = "cont" id = "background">
                <Formik 
                    initialValues={{title: book.title, author: book.author, edition: book.edition, 
                        category: book.category, cover: book.cover, isbn: book.isbn, 
                        quantity: book.quantity, buyPrice: book.buyPrice, sellPrice: book.sellPrice,
                        publicationDate: book.publicationDate, publisher: book.publisher, 
                        threshold: book.threshold 
                    }} 
                    onSubmit={async (data) => {

                        let bookUpdateData={
                            method: 'PATCH',
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
                            body: JSON.stringify({
                                'title': data.title,
                                'author': data.author,
                                'edition': data.edition,
                                'category': data.category,
                                'cover': data.cover,
                                'isbn': data.isbn,
                                'quantity': data.quantity,
                                'buyPrice': data.buyPrice,
                                'sellPrice': data.sellPrice,
                                'publicationDate': data.publicationDate,
                                'publisher': data.publisher,
                                'threshold': data.threshold,
                            })
                        }
                        const bookUpdateResponse = await (await fetch(`http://localhost:3000/api/books/${book.history.location.state.book.isbn}`, bookUpdateData)).json()
                        console.log(data.isbn)
                        console.log(book.history.location.state.book.isbn)
                        if(bookUpdateResponse.errors) {
                            console.log(bookUpdateResponse.errors.split(';'))
                        }
                        else {
                            console.log('no errors')
                        }    
                    }}
                    validationSchema={validationSchema}
                >{({    handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form className="login-form" id = "form-edbks" onSubmit={handleSubmit}>
                            <h1>Edit Book</h1>
                            <div id = "col-edbks">
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control 
                                            name='title'
                                            value={values.title}
                                            placeholder = {book.history.location.state.book.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.title && !errors.title}
                                            isInvalid={touched.title && errors.title}
                                        />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control 
                                            name='author'
                                            value={values.author}
                                            placeholder = {book.history.location.state.book.author}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.author && !errors.author}
                                            isInvalid={touched.author && errors.author} 
    
                                        />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Edition</Form.Label>
                                        <Form.Control 
                                            name='edition'
                                            value={values.edition}
                                            placeholder = {book.history.location.state.book.edition}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.edition && !errors.edition}
                                            isInvalid={touched.edition && errors.edition} 
    
                                        />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control 
                                            name='category'
                                            value={values.category}
                                            placeholder = {book.history.location.state.book.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.category && !errors.category}
                                            isInvalid={touched.category && errors.category} 
    
                                        />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Cover Image</Form.Label>
                                        <Form.Control 
                                            name='cover'
                                            value={values.cover}
                                            placeholder = {book.history.location.state.book.cover}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.cover && !errors.cover}
                                            isInvalid={touched.cover && errors.cover} 
    
                                        />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>ISBN</Form.Label>
                                        <Form.Control 
                                            name='isbn'
                                            value={values.isbn}
                                            placeholder = {book.history.location.state.book.isbn}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.isbn && !errors.isbn}
                                            isInvalid={touched.isbn && errors.isbn} 
    
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Quantitiy</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='quantity'
                                            value={values.quantity}
                                            placeholder = {book.history.location.state.book.quantity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.quantity && !errors.quantity}
                                            isInvalid={touched.quantity && errors.quantity} 
    
                                        />
                                    </Form.Group>
                                    <Form.Label>Buy Price</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='buyPrice'
                                            value={values.buyPrice}
                                            placeholder = {book.history.location.state.book.buyPrice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.buyPrice && !errors.buyPrice}
                                            isInvalid={touched.buyPrice && errors.buyPrice} 
    
                                        />
                                    </Form.Group>
                                    <Form.Label>Sell Price</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='sellPrice'
                                            value={values.sellPrice}
                                            placeholder = {book.history.location.state.book.sellPrice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.sellPrice && !errors.sellPrice}
                                            isInvalid={touched.sellPrice && errors.sellPrice}

                                        />
                                    </Form.Group>
                                    <Form.Label>Publication Date</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='publicationDate'
                                            type="date"
                                            value={values.publicationDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.publicationDate && !errors.publicationDate}
                                            isInvalid={touched.publicationDate && errors.publicationDate} 

                                        />
                                    </Form.Group>
                                    <Form.Label>Publisher</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='publisher'
                                            value={values.publisher}
                                            placeholder = {book.history.location.state.book.publisher}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.publisher && !errors.publisher}
                                            isInvalid={touched.publisher && errors.publisher} 
    
                                        />
                                    </Form.Group>
                                    <Form.Label>Threshold Value</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='threshold'
                                            value={values.threshold}
                                            placeholder = {book.history.location.state.book.threshold}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.threshold && !errors.threshold}
                                            isInvalid={touched.threshold && errors.threshold} 
    
                                        />
                                    </Form.Group>
                                </Col>
                            </div>
                            <Button 
                                variant="primary" 
                                type="submit" 
                            >
                                Submit
                            </Button>
                            <Link to='/'>
                                <Button id='back-button'>Back</Button>
                            </Link>
                        </Form>
                    )}</Formik>
            </div>
        </>
    )
}

export default EditBook