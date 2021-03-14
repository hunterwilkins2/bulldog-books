import React, {useState, useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'

import { promosData } from '../data/promosData'


function Promos(){

    const  rowStyle = {
        border:'2px solid #ffffff',
        background: 'lightgray',
        // borderRadius: '25px',
        width: '100%',
        margin: '1%',
        height: '100%',
        alignItems:'center',
        textAlign:'center',
    }

    const pic = {
        width: '100%',
        height: '100%',
    }

    const col1 = {
        margin: '2%',
        maxWidth: '30%',
    }

    const col2 = {
        fontWeight: 'bold',
        maxWidth: '45%',
    }

    const col3 = {
        fontWeight: 'bold',
        fontSize: '180%',
        maxWidth: '25%',
    }

    const pcode = {
        paddingLeft: '33%'
    }

    const [promos, setPromos] = useState([])

    useEffect(() => {
        setPromos(promosData)
    }, [])

    const PromoData = promos.map(promo => (

        <Row className = "mx-auto" style = {rowStyle} key={promo.title}>
            <Col style = {col1}>
                <img style = {pic} src={promo.image} alt = "book" />
            </Col>
            <Col style = {col2}>

                <Row > {promo.title} </Row>
                <br></br>
                <Row style = {pcode}> CODE: {promo.code} </Row>
            
            </Col>
            <Col style = {col3}> {promo.discount}</Col>
        </Row>

    ))

    return(
        <div>
            {PromoData}
        </div>
    )

}

    

export default Promos