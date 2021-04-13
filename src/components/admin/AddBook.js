import React from 'react'
import { Form, Button } from 'react-bootstrap'

import StoreNavbar from '../StoreNavbar'
import '../styles/Background.css'
import '../styles/AddBook.css'


function AddBook () {


    const addBookForm = (
        <div id = "form-cont-adbks">

            <Form id = "form-adbks">
                <h2> Add Book </h2>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Book Title </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Author </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Edition </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Category</Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Cover </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> ISBN Number </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Quantity </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Buy Price </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Sell Price </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Publication Date </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label> Publisher </Form.Label>
                        <Form.Control>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button> Add </Button>
            </Form>
        </div>

    )


    return (
        <div id = "background">
            <StoreNavbar/>
            {addBookForm}
            
        </div>
    )
}

export default AddBook