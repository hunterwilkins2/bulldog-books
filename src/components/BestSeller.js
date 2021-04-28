import React, {useState, useEffect} from 'react'
import {Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

    const bookCards = bSellers.map((bseller, index) => (

        <Row className = "mx-auto" id = "row-style-b" key={bseller.title}>
            <Row id = "row1-bs"> 
                <Col id = "col1-b">
                    <img className = "mx-auto" id = "pic-b" src={bseller.cover} alt = "book" />
                </Col>
                <Col id = "col2-b"> {bseller.title}</Col>
                <Col id = "col3-b"> {bseller.author}</Col>
            </Row>
            <Row id = "row2-buttons-bs" className = "mx-auto">
                <div>
                    <Link to={{ pathname: '/MoreInfo', state: { book: bseller} }}>
                        <Button className = "but-mp"
                            variant="primary" 
                            value={index}
                        >
                                        More Info
                        </Button>
                    </Link>
                </div>
                <div>
                    <Button id = "button-atc-bs" size='sm'>Add to Cart</Button>
                </div>
            </Row>
        </Row>

    ))

    return(
        <div>
            {bookCards}
        </div>
    )

}

    

export default BestSellers