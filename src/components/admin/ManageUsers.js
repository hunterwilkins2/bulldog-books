import {React} from 'react'
// import { Formik } from 'formik'
import {Row, Col, Button} from 'react-bootstrap'
// import * as yup from 'yup'

import StoreNavbar from '../StoreNavbar'
import './../styles/ManageUsers.css'

function ManagePromotions(){

    return  (
        
        <div>
            <StoreNavbar/>
            <div>
                <Row>
                    <Col className = "col-title-manusers"> Last Name </Col>
                    <Col className = "col-title-manusers"> First Name </Col>
                    <Col className = "col-title-manusers"> Email </Col>
                    <Col className = "col-title-manusers"> Email </Col>
                    <Col className = "col-title-manusers"> Recieving Promotions </Col>
                    <Col className = "col-title-manusers"> Date Joined </Col>
                    <Col className = "col-title-manusers"> Status </Col>
                    <Col className = "col-title-manusers"> User Type </Col>          
                </Row>
                <Row>
                    <Col className = "col-list-manusers"> Last Name </Col>
                    <Col className = "col-list-manusers"> First Name </Col>
                    <Col className = "col-list-manusers"> Email </Col>
                    <Col className = "col-list-manusers"> Email </Col>
                    <Col className = "col-list-manusers"> Recieving Promotions </Col>
                    <Col className = "col-list-manusers"> Date Joined </Col>
                    <Col className = "col-list-manusers"> Status </Col>
                    <Col className = "col-list-manusers"> User Type </Col>
                    <Button className = "but-manusers"> Promote/Demote </Button>         
                </Row>
                
            
            </div>
        </div>
    )

}

export default ManagePromotions