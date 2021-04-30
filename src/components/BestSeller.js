import React, {useState, useEffect} from 'react'
import {Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

// import { bsellerData } from '../data/bsellerData'
import './styles/Bestsellers.css' 

import ReactNotification from 'react-notifications-component'
import {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'


function BestSellers(){

    const handleOnClickNotifications = () => {
        store.addNotification({
            title: 'Cart Notfication',
            message: 'Book Successfully Added To Cart!',
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated animate__fadeIn'], 
            animationOut: ['animate__animated animate__fadeOut'],

            dismiss: {
                duration: 3000,
                showIcon: true
            },

            width: 800
        })
    }

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
            <Col id = "maincol1-b">
                <img className = "mx-auto" id = "pic-b" src={bseller.cover} alt = "book" />
            </Col>
            <Col id = "maincol2-b">
                <Row id = "row1-text-b">
                    <Col id = "col2-b"> {bseller.title}</Col>
                    <Col id = "col3-b"> {bseller.author}</Col>
                </Row>
                <Row id = "row2-buttons-b" className = "mx-auto">
                    <div>
                        <Link to={{ pathname: '/MoreInfo', state: { book: bseller} }}>
                            <Button
                                id = "button-mi-b"
                                variant="primary" 
                                value={index}
                            >
                                        More Info
                            </Button>
                        </Link>
                    </div>
                    <div>
                        {Cookies.get('userType') && 
                        <Button 
                            id = "button-atc-b"
                            variant="primary" 
                            value = {index}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            onClick = {async (event) => {{await addToCart(event)}; {handleOnClickNotifications()}}}
                        >
                                        Add To Cart
                        </Button>
                        }
                    </div>
                </Row>
            </Col>
        </Row>

    ))

    return(
        <div>
            <ReactNotification/>
            {bookCards}
        </div>
    )

}

    

export default BestSellers