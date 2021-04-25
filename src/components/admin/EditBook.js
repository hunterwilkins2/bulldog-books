import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

import StoreNavbar from '../StoreNavbar'
import '../styles/EditBook.css'

function EditBook (book) {
    
    console.log(book)
    
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
                        console.log(data)

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
                        const bookUpdateResponse = await (await fetch(`http://localhost:3000/api/books/${data.isbn}`, bookUpdateData)).json()
                        if(bookUpdateResponse.errors) {
                            console.log(bookUpdateResponse.errors.split(';'))
                        }
                        else {
                            console.log('no errors')
                        }    



                    }}
                >{({ handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        // touched,
                        // errors,
                        // setSubmitting
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                
                                    <Form.Group >
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control 
                                            name='author'
                                            value={values.author}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                
                                    <Form.Group >
                                        <Form.Label>Edition</Form.Label>
                                        <Form.Control 
                                            name='edition'
                                            value={values.edition}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                
                                    <Form.Group >
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control 
                                            name='category'
                                            value={values.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                
                                    <Form.Group >
                                        <Form.Label>Cover Image</Form.Label>
                                        <Form.Control 
                                            name='cover'
                                            value={values.cover}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                
                                    <Form.Group >
                                        <Form.Label>ISBN</Form.Label>
                                        <Form.Control 
                                            name='isbn'
                                            value={values.isbn}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Quantitiy</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='quantity'
                                            value={values.quantity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                    <Form.Label>Buy Price</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='buyPrice'
                                            value={values.buyPrice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                    <Form.Label>Sell Price</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='sellPrice'
                                            value={values.sellPrice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

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

                                        />
                                    </Form.Group>
                                    <Form.Label>Publisher</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='publisher'
                                            value={values.publisher}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Form.Group>
                                    <Form.Label>Threshold Value</Form.Label>
                                    <Form.Group >
                                        <Form.Control 
                                            name='threshold'
                                            value={values.threshold}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

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