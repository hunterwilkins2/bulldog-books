import React, {useState, useEffect} from 'react'
import {Row, Col, Button } from 'react-bootstrap'

// import { bsellerData } from '../data/bsellerData'
import './styles/Bestsellers.css' 


function BestSellers(){

    const [bSellers, setbSellers] = useState([])

    useEffect(() => {
        async function fetchbSellers(){
            const response = await fetch('http://localhost:3000/api/BestSellers')
            const bsellerData = await response.json()
            setbSellers(bsellerData)
        }
        fetchbSellers()
    }, [])

    const bookCards = bSellers.map(bseller => (

        <Row className = "mx-auto" id = "row-style-b" key={bseller.title}>
            <Col id = "col1-b">
                <img id = "pic-b" src={bseller.cover} alt = "book" />
            </Col>
            <Col id = "col2-b"> {bseller.title}</Col>
            <Col id = "col3-b"> {bseller.author}</Col>
            <Col id = "col3-nr">
                <Row>
                    <Button size='sm'>More Info..</Button>
                </Row>
                <br></br>
                <Row>
                    <Button size='sm'>Add to Cart</Button>
                </Row>
            </Col>
        </Row>

    ))

    return(
        <div>
            {bookCards}
        </div>
    )

}

    

export default BestSellers