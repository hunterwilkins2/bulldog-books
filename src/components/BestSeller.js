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



    async function addToCart (event) {

        let bookIndex = event.target.value
        let bookID = bSellers[bookIndex]._id
        let quantity = 1

        console.log(bookIndex)
        console.log(bookID)
        console.log(quantity)

        let bookData={
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                'bookID': bookID,
                'quantity': quantity
            })
        }

        let userResponse = await (await fetch('http://localhost:3000/api/cart', bookData)).json()

        if(userResponse.errors) {
            console.log(userResponse.errors.split(';'))
        }
        else {
            console.log('no errors')
        } 
    }



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
                    <Link to={{ pathname: '/user/Cart', state: { book: bseller} }}>
                        <Button 
                            className = "but-mb"
                            variant="primary" 
                            value = {index}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            onClick = {async (event) => {await addToCart(event)}}
                        >
                                        Add To Cart
                        </Button>
                    </Link>
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