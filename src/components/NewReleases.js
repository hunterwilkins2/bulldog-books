import React, {useState, useEffect} from 'react'
import {Row, Col, Button} from 'react-bootstrap'

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

    const bookCards = nReleases.map(nReleases => (

        <Row className = "mx-auto" id = "row-style-nr" key={nReleases.title}>
            <Col id = "col1-nr">
                <img id = "pic-nr" src={nReleases.cover} alt = "book" />
            </Col>
            <Col id = "col2-nr"> {nReleases.title}</Col>
            <Col id = "col3-nr"> {nReleases.author}</Col>
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

    

export default NewReleases