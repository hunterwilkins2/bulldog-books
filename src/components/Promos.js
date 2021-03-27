import React, {useState, useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'

import { promosData } from '../data/promosData'
import './styles/Promos.css' 


function Promos(){


    const [promos, setPromos] = useState([])

    useEffect(() => {
        setPromos(promosData)
    }, [])

    const PromoData = promos.map(promo => (

        <Row className = "mx-auto" id = "row-style-p" key={promo.title}>
            <Col id = "col1-p">
                <img id = "pic-p" src={promo.image} alt = "book" />
            </Col>
            <Col id = "col2-p">

                <Row > {promo.title} </Row>
                <br></br>
                <Row className = "mx-auto" id = "pcode-p"> CODE: {promo.code} </Row>
            
            </Col>
            <Col id = "col3-p"> {promo.discount}</Col>
        </Row>

    ))

    return(
        <div>
            {PromoData}
        </div>
    )

}

    

export default Promos