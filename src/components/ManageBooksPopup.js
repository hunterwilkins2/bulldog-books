import React from 'react'
import {Modal} from 'react-bootstrap'
import PropTypes from 'prop-types'

function ManageBooksPopup(props) {
    let title = null
    console.log('In ManageBooksPopup()')
    if (props.book !== null) {
        console.log('if')
        title = props.book.title
        console.log(props.book.title)
    }
    else {
        console.log('else')
    }
    return(
        <Modal show={props.show}>{title}</Modal>
    )
}

ManageBooksPopup.propTypes = {
    show: PropTypes.bool,
    book: PropTypes.any
}

export default ManageBooksPopup