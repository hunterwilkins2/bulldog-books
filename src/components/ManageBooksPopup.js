import React from 'react'
import {Modal} from 'react-bootstrap'
import PropTypes from 'prop-types'

function ManageBooksPopup(props) {
    console.log('In ManageBooksPopup ' + props)
    console.log(props.show)
    return(
        <Modal show={props.show}>hello</Modal>
    )
}

ManageBooksPopup.propTypes = {
    show: PropTypes.bool
}

export default ManageBooksPopup