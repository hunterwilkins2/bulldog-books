import React from 'react'
import {Modal, Form} from 'react-bootstrap'
import PropTypes from 'prop-types'

function ManageBooksPopup(props) {
    let title = null
    let subtitle = null
    let author = null
    let isbn = null
    let website = null
    console.log('In ManageBooksPopup()')
    if (props.book !== null) {
        title = props.book.title
        subtitle = props.book.subtitle
        author = props.book.author
        isbn = props.book.isbn
        website = props.book.website
    }
    return(
        <Modal show={props.show}>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder={title} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control placeholder={subtitle} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control placeholder={author} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control placeholder={isbn} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control placeholder={website} />
                </Form.Group>
            </Form>
        </Modal>
    )
}

ManageBooksPopup.propTypes = {
    show: PropTypes.bool,
    book: PropTypes.any
}

export default ManageBooksPopup