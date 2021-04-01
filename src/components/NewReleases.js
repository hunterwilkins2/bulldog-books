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
            <Row id = "row1-nr">
                <Col  id = "col1-nr">
                    <img className = "mx-auto" id = "pic-nr" src={nReleases.cover} alt = "book" />
                </Col>
                <Col id = "col2-nr"> {nReleases.title}</Col>
                <Col id = "col3-nr"> {nReleases.author}</Col>
            </Row>
            <Row id = "row2-buttons-nr" className = "mx-auto">
                <div>
                    <Button id = "button-mi-nr" size='sm'>More Info..</Button>
                </div>
                <div>
                    <Button id = "button-atc-nr" size='sm'>Add to Cart</Button>
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

    

export default NewReleases