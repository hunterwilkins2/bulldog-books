import React, {useState} from 'react'
import { Form, Button, Alert, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Formik, ErrorMessage} from 'formik'
import * as yup from 'yup'
import moment from 'moment'

import StoreNavbar from '../StoreNavbar'
import '../styles/Background.css'
import '../styles/AddBook.css'


function AddBook () {

    const currentDate = moment().format('YYYY-MM-DD')
    console.log(currentDate)

    const [errors, setErrors] = useState([])
    const [noErrors, setNoErrors] = useState(false)

    const alerts = errors.map(error => 
        <Alert key={error} variant='danger'>
            {error}
        </Alert>
    )

    const validationSchema = yup.object().shape({
        title: yup.string()
            .min(1, 'Title must be betwen 1 and 500 characters')
            .max(500, 'Title must be betwen 1 and 500 characters')
            .required('Required'),
        author: yup.string()
            .min(1, 'Author must be betwen 1 and 200 characters')
            .max(200, 'Author must be betwen 1 and 200 characters')
            .required('Required'),
        edition: yup.string()
            .min(1, 'Edition must be betwen 1 and 10 characters')
            .max(10, 'Edition must be betwen 1 and 10 characters')
            .required('Required'),
        category: yup.string()
            .min(1, 'Category must be betwen 1 and 100 characters')
            .max(100, 'Category must be betwen 1 and 100 characters')
            .required('Required'),
        cover: yup.string()
            .min(1, 'Cover must be betwen 1 and 200 characters')
            .max(200, 'Cover must be betwen 1 and 200 characters')
            .required('Required'),
        isbn: yup.string()
            .min(10, 'ISBN must be betwen 10 and 13 characters')
            .max(13, 'ISBN must be betwen 10 and 13 characters')
            .matches('^[0-9]*$', 'Can only contain numbers')
            .required('Required'),
        quantity: yup.string()
            .min(1, 'Quantity must be betwen 1 and 6 digits')
            .max(6, 'Quantity must be betwen 1 and 6 digits')
            .matches('^[0-9]*$', 'Can only contain numbers')
            .required('Required'),
        threshold: yup.string()
            .min(1, 'ISBN must be betwen 1 and 6 digits')
            .max(6, 'ISBN must be betwen 1 and 6 digits')
            .matches('^[0-9]*$', 'Can only contain numbers')
            .required('Required'),
        buyPrice: yup.string()
            .min(1, 'buyPrice must be betwen 1 and 10 digits')
            .max(10, 'buyPrice must be betwen 1 and 10 digits')
            .required('Required'),
        sellPrice: yup.string()
            .min(1, 'sellPrice must be betwen 1 and 10 digits')
            .max(10, 'sellPrice must be betwen 1 and 10 digits')
            .required('Required'),
        publicationDate: yup.date()
            .max(currentDate, 'Cannot choose a future date')
            .required('Required'),
        publisher: yup.string()
            .min(1, 'Publisher must be betwen 1 and 200 characters')
            .max(200, 'Publisher must be betwen 1 and 200 characters')
            .required('Required')
    })

    return (
        <div id = "background">
            <StoreNavbar/>
            <Formik
                initialValues={{
                    title: '',
                    author: '',
                    edition: '',
                    category: '',
                    cover: '',
                    isbn:  '',
                    quantity: '',
                    buyPrice: '',
                    sellPrice: '',
                    publicationDate: '',
                    publisher: '',
                    threshold: ''
                }}
                onSubmit={ async (data) => {
                    let addBookData = {
                        method: 'POST',
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
                            'isbn':  data.isbn,
                            'quantity': data.quantity,
                            'buyPrice': data.buyPrice,
                            'sellPrice': data.sellPrice,
                            'publicationDate': data.publicationDate,
                            'publisher': data.publisher,
                        })
                    }

                    const addBookResponse = await (await fetch('http://localhost:3000/api/books', addBookData)).json()
                    if(addBookResponse.errors) {
                        console.log(addBookResponse.errors.split(';'))
                    }
                    else {
                        console.log('no errors')
                    }
                    if(addBookResponse.errors){
                        setErrors(addBookResponse.errors.split(';'))
                        setNoErrors(false)
                    } 
                    else {
                        setNoErrors(true)
                    }                   
                }}
                validationSchema={validationSchema}
            >{({    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    dirty,
                    isValid,
                }) => (
                    <div id = "form-cont-adbks">
                        {alerts}
                        <Form id = "form-adbks" onSubmit={handleSubmit}>
                            <h2 id = "title-adbks"> Add Book </h2>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label> Book Title </Form.Label>
                                    <Form.Control
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={touched.title && errors.title} 
                                    />
                                    <ErrorMessage name="title" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Author </Form.Label>
                                    <Form.Control
                                        name="author"
                                        value={values.author}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.author && !errors.author}
                                        isInvalid={touched.author && errors.author} 
                                    />
                                    <ErrorMessage name="author" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> ISBN  </Form.Label>
                                    <Form.Control
                                        name="isbn"
                                        value={values.isbn}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.isbn && !errors.isbn}
                                        isInvalid={touched.isbn && errors.isbn} 
                                    />
                                    <ErrorMessage name="isbn" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label> Edition </Form.Label>
                                    <Form.Control
                                        name="edition"
                                        value={values.edition}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.edition && !errors.edition}
                                        isInvalid={touched.edition && errors.edition} 
                                    />
                                    <ErrorMessage name="edition" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Category</Form.Label>
                                    <Form.Control
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.category && !errors.category}
                                        isInvalid={touched.category && errors.category} 
                                    />
                                    <ErrorMessage name="category" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Publisher </Form.Label>
                                    <Form.Control
                                        name="publisher"
                                        value={values.publisher}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.publisher && !errors.publisher}
                                        isInvalid={touched.publisher && errors.publisher} 
                                    />
                                    <ErrorMessage name="publisher" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label> Publication Date </Form.Label>
                                    <Form.Control
                                        name="publicationDate"
                                        type="date"
                                        value={values.publicationDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.publicationDate && !errors.publicationDate}
                                        isInvalid={errors.publicationDate} 
                                    />
                                    <ErrorMessage name="publicationDate" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Cover </Form.Label>
                                    <Form.Control
                                        name="cover"
                                        placeholder="https://link-to-cover"
                                        value={values.cover}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.cover && !errors.cover}
                                        isInvalid={touched.cover && errors.cover} 
                                    />
                                    <ErrorMessage name="cover" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Quantity </Form.Label>
                                    <Form.Control
                                        name="quantity"
                                        value={values.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.quantity && !errors.quantity}
                                        isInvalid={touched.quantity && errors.quantity} 
                                    />
                                    <ErrorMessage name="quantity" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label> Buy Price </Form.Label>
                                    <Form.Control
                                        name="buyPrice"
                                        value={values.buyPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.buyPrice && !errors.buyPrice}
                                        isInvalid={touched.buyPrice && errors.buyPrice} 
                                    />
                                    <ErrorMessage name="buyPrice" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Sell Price </Form.Label>
                                    <Form.Control
                                        name="sellPrice"
                                        value={values.sellPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.sellPrice && !errors.sellPrice}
                                        isInvalid={touched.sellPrice && errors.sellPrice} 
                                    />
                                    <ErrorMessage name="sellPrice" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label> Threshold </Form.Label>
                                    <Form.Control
                                        name="threshold"
                                        value={values.threshold}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.threshold && !errors.threshold}
                                        isInvalid={touched.threshold && errors.threshold} 
                                    />
                                </Form.Group>
                                <ErrorMessage name="threshold" />
                            </Form.Row>
                            <div id = "addbut-adbks">
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={!(dirty && isValid)}
                                > 
                                    Add 
                                </Button>
                            </div>
                        </Form>
                        {noErrors && <Redirect to='/'/>}
                    </div>
                )}</Formik>
        </div>
    )
}

export default AddBook