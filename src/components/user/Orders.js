import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'

import UserNav from './UserNav'
import '../../styles.css'
import { ordersData } from '../../data/orderInfo'

function Orders(){

    const pageTitle = {
        textAlign: 'left',
        marginLeft: '6%',
        marginTop: '1%',
        marginBottom: '2%',
    }
    
    const contStyle = {
        border:'0.5px solid #ffffff',
        background: '#ffffff',
        borderRadius: '20px',
        padding: '15px',
        marginBottom: '1%',
    }

    const topBuffer = {
        marginTop: '20px'
    }

    const cardStyle1 = {
        padding: '10px',
        maxHeight: '90%',
        width: '100%',
        height: '100%',
    }

    const cardStyle2 = {
        padding: '10px',
        maxHeight: '90%',
        width: '100%',
        height: '100%',
    }

    const cardStyle3 = {
        padding: '10px',
        maxHeight: '90%',
        width: '100%',
        height: '100%',
    }

    const cardTitle = {
        padding: '15px',
    }

    const secTitle = {
        fontWeight: 'bold',
    }

    const image = {
        height: '85%',
    }
    

    const [orderInfo, setOrders] = useState([])
    
    useEffect(() => {
        setOrders(ordersData)
    }, [])
        
    

    const orderCards = orderInfo.map(orderInput => (
        <>   
            <Container style={contStyle}>
                <Row>
                    <h3 style = {cardTitle}> Order {orderInput.orderNum}</h3>
                </Row>
                <Row className = 'mx-auto' lg={3}> 
                    <Col style={topBuffer} key={orderInput.isbn} xs='1'>
                        <Card style={cardStyle1}>
                            <Card.Title>{orderInput.title}</Card.Title>
                            <Card.Img style={image} variant="top" src={orderInput.image} />
                        </Card>
                    </Col>
                    <Col style={topBuffer} key={orderInput.TrackingId} xs='1'>
                        <Card style={cardStyle2}>
                            <Card.Title> Shipping Information </Card.Title>
                            <Card.Body> <div style = {secTitle}>Address Shipped: </div>  {orderInput.Address} </Card.Body>
                            <Card.Body> <div style = {secTitle}> Quantity Shipped: </div>  {orderInput.QuantityShipped}</Card.Body>
                            <Card.Body> <div style = {secTitle}> Date Shipped: </div>  {orderInput.DateShipped}</Card.Body>
                            <Card.Body> <div style = {secTitle}> Tracking Id: </div>  {orderInput.TrackingId}</Card.Body>
                        </Card>
                    </Col>
                    <Col style={topBuffer} key={orderInput.OrderId} xs='1'>
                        <Card style={cardStyle3}>
                            <Card.Title>Order Information</Card.Title>
                            <Card.Body> <div style = {secTitle}> Price </div>  {orderInput.Price} </Card.Body>
                            <Card.Body> <div style = {secTitle}> Quantity Ordered: </div>  {orderInput.QuantityOrdered}</Card.Body>
                            <Card.Body> <div style = {secTitle}> Date Ordered: </div>  {orderInput.DateOrdered}</Card.Body>
                            <Card.Body> <div style = {secTitle}> Order ID: </div>  {orderInput.OrderID}</Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>

    ))    


    return(
        <div>
            <UserNav/> 
            <h1 style = {pageTitle} >Order History</h1> 
                    
            {orderCards}
                    
        </div>
    )
}
export default Orders
