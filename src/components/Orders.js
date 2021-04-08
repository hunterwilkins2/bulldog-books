import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'

import StoreNavbar from './StoreNavbar'
import { ordersData } from '../data/orderInfo'
import './styles/Orders.css' 
import './styles/Background.css'


function Orders(){
    

    // const [orderInfo, setOrders] = useState([])
    
    // useEffect(() => {
    //     async function fetchOrders(){
    //         const response = await fetch('http://localhost:3000/api/Orders')
    //         const ordersData = await response.json()
    //         setOrders(ordersData)
    //     }
    //     fetchOrders()
    // }, [])

    const [orderInfo, setOrders] = useState([])
    
    useEffect(() => {

        setOrders(ordersData)
        
    }, [])
        
    

    const orderCards = orderInfo.map(orderInput => (
        <>   
            <Container id = "cont-style">
                <Row>
                    <h3 id = "card-title"> Order {orderInput.orderNum}</h3>
                </Row>
                <Row className = 'mx-auto' lg={3}> 
                    <Col id = "top-buffer" key={orderInput.isbn} xs='1'>
                        <Card id = "card-style1">
                            <Card.Title>{orderInput.title}</Card.Title>
                            <Card.Img className = "mx-auto" id = "image" src={orderInput.image} />
                        </Card>
                    </Col>
                    <Col id = "top-buffer" key={orderInput.TrackingId} xs='1'>
                        <Card id = "card-style2">
                            <Card.Title> Shipping Information </Card.Title>
                            <Card.Body> <div id = "sec-title">Address Shipped: </div>  {orderInput.Address} </Card.Body>
                            <Card.Body> <div id = "sec-title"> Quantity Shipped: </div>  {orderInput.QuantityShipped}</Card.Body>
                            <Card.Body> <div id = "sec-title"> Date Shipped: </div>  {orderInput.DateShipped}</Card.Body>
                            <Card.Body> <div id = "sec-title"> Tracking Id: </div>  {orderInput.TrackingId}</Card.Body>
                        </Card>
                    </Col>
                    <Col id = "top-buffer" key={orderInput.OrderId} xs='1'>
                        <Card id = "card-style3">
                            <Card.Title>Order Information</Card.Title>
                            <Card.Body> <div id = "sec-title"> Price </div>  {orderInput.Price} </Card.Body>
                            <Card.Body> <div id = "sec-title"> Quantity Ordered: </div>  {orderInput.QuantityOrdered}</Card.Body>
                            <Card.Body> <div id = "sec-title"> Date Ordered: </div>  {orderInput.DateOrdered}</Card.Body>
                            <Card.Body> <div id = "sec-title"> Order ID: </div>  {orderInput.OrderID}</Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>

    ))    


    return(
        <div id = "background">
            <StoreNavbar/> 
            <h1 id = "page-title" >Order History</h1> 
                    
            {orderCards}
                    
        </div>
    )
}
export default Orders
