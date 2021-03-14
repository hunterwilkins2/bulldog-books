import React, {useState, useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'

import { bsellerData } from '../data/bsellerData'


function BestSellers(){

    const rowStyle = {
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
    }

    const col2 = {
        fontWeight: 'bold',
    }

    const col3 = {
        fontWeight: 'bold',      
    }

    const [bSellers, setbSellers] = useState([])

    useEffect(() => {
        setbSellers(bsellerData)
    }, [])

    const bookCards = bSellers.map(bseller => (

        <Row className = "mx-auto" style = {rowStyle} key={bseller.title}>
            <Col style = {col1}>
                <img style = {pic} src={bseller.image} alt = "book" />
            </Col>
            <Col style = {col2}> {bseller.title}</Col>
            <Col style = {col3}> {bseller.author}</Col>
        </Row>

    ))

    return(
        <div>
            {bookCards}
        </div>
    )

}

    

export default BestSellers