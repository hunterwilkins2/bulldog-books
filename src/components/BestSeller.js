import React, {useState, useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'

import { bsellerData } from '../data/bsellerData'
import './styles/Bestsellers.css' 


function BestSellers(){

    const [bSellers, setbSellers] = useState([])

    useEffect(() => {
        setbSellers(bsellerData)
    }, [])

    const bookCards = bSellers.map(bseller => (

        <Row className = "mx-auto" id = "row-style-b" key={bseller.title}>
            <Col id = "col1-b">
                <img id = "pic-b" src={bseller.image} alt = "book" />
            </Col>
            <Col id = "col2-b"> {bseller.title}</Col>
            <Col id = "col3-b"> {bseller.author}</Col>
        </Row>

    ))

    return(
        <div>
            {bookCards}
        </div>
    )

}

    

export default BestSellers