import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

function ManageBooksPopup(props) {
    let title = null
    let subtitle = null
    let author = null
    let isbn = null
    let website = null
    if (props.book !== null) {
        title = props.book.title
        subtitle = props.book.subtitle
        author = props.book.author
        isbn = props.book.isbn
        website = props.book.website
    }
    return(
        <Modal show={props.show}>
            <Modal.Header>Edit Book</Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ManageBooksPopup.propTypes = {
    show: PropTypes.bool,
    book: PropTypes.any,
    close: PropTypes.func
}

export default ManageBooksPopup