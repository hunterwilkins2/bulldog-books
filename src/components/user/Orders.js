import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'

import UserNav from '../UserNav'
// import StoreNavbar from '../StoreNavbar'
import { ordersData } from '../../data/orderInfo'
import './../styles/Orders.css' 



function Orders(){

    // const pageTitle = {
    //     textAlign: 'left',
    //     marginLeft: '6%',
    //     marginTop: '1%',
    //     marginBottom: '2%',
    // }
    
    // const contStyle = {
    //     border:'0.5px solid #ffffff',
    //     background: '#ffffff',
    //     borderRadius: '20px',
    //     padding: '15px',
    //     marginBottom: '1%',
    // }

    // const topBuffer = {
    //     marginTop: '20px'
    // }

    // const cardStyle1 = {
    //     padding: '10px',
    //     maxHeight: '90%',
    //     width: '100%',
    //     height: '100%',
    // }

    // const cardStyle2 = {
    //     padding: '10px',
    //     maxHeight: '90%',
    //     width: '100%',
    //     height: '100%',
    // }

    // const cardStyle3 = {
    //     padding: '10px',
    //     maxHeight: '90%',
    //     width: '100%',
    //     height: '100%',
    // }

    // const cardTitle = {
    //     padding: '15px',
    // }

    // const secTitle = {
    //     fontWeight: 'bold',
    // }

    // const image = {
    //     height: '85%',
    // }
    

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
            <UserNav/> 
            <h1 id = "page-title" >Order History</h1> 
                    
            {orderCards}
                    
        </div>
    )
}
export default Orders
