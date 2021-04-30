import React, {useState, useEffect} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import './styles/NewReleases.css' 


function NewReleases(){

    const [nReleases, setnReleases] = useState([])

    useEffect(() => {
        async function fetchnReleases(){
            const response = await fetch('http://localhost:3000/api/NewReleases')
            const nreleasesData = await response.json()
            setnReleases(nreleasesData)
        }
        fetchnReleases()
    }, [])

    async function addToCart (event) {

        let bookIndex = event.target.value
        let bookID = nReleases[bookIndex]._id
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

    const bookCards = nReleases.map((nReleases, index) => (

        <Row className = "mx-auto" id = "row-style-nr" key={nReleases.title}>
            <Col  id = "maincol1-nr">
                <img className = "mx-auto" id = "pic-nr" src={nReleases.cover} alt = "book" />
            </Col>
            <Col id = "maincol2-nr">
                <Row id = "row1-text-nr">
                    <Col id = "col2-nr"> {nReleases.title}</Col>
                    <Col id = "col3-nr"> {nReleases.author}</Col>
                </Row>
                <Row id = "row2-buttons-nr" className = "mx-auto">
                    <div>
                        <Link to={{ pathname: '/MoreInfo', state: { book: nReleases} }}>
                            <Button 
                                id = "button-mi-nr"
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
                            id = "button-atc-nr"
                            variant="primary" 
                            value = {index}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            onClick = {async (event) => {await addToCart(event)}}
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
            {bookCards}
        </div>
    )

}

    

export default NewReleases