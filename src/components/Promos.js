import React, {useState, useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'

import { promosData } from '../data/promosData'
import './styles/Promos.css' 


function Promos(){

    // const  rowStyle = {
    //     border:'2px solid #ffffff',
    //     background: 'lightgray',
    //     // borderRadius: '25px',
    //     width: '100%',
    //     margin: '1%',
    //     height: '100%',
    //     alignItems:'center',
    //     textAlign:'center',
    // }

    // const pic = {
    //     width: '100%',
    //     height: '100%',
    // }

    // const col1 = {
    //     margin: '2%',
    //     maxWidth: '30%',
    // }

    // const col2 = {
    //     fontWeight: 'bold',
    //     maxWidth: '45%',
    // }

    // const col3 = {
    //     fontWeight: 'bold',
    //     fontSize: '180%',
    //     maxWidth: '25%',
    // }

    // const pcode = {
    //     paddingLeft: '33%'
    // }

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
                <Row id = "pcode-p"> CODE: {promo.code} </Row>
            
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