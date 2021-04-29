import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'
import moment from 'moment'

import StoreNavbar from './StoreNavbar'
import './styles/Orders.css' 
import './styles/Background.css'


function Orders(){
    
    const currentDate = moment().format('MM-DD-YYYY')
    console.log(currentDate)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const [orders, setOrders] = useState([])

    async function fetchBooks(){
        let orderGetData={
            method: 'GET',
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
        }
        const response = await fetch('http://localhost:3000/api/order', orderGetData)
        const data = await response.json()
        if(data.errors) {
            console.log(data.errors.split(';')) 
        }
        await setOrders(data)
        console.log(data)
    }

    useEffect(() => {
        fetchBooks()
    }, [])


    console.log(orders)
    
    const orderCards = orders.map((order, orderIndex) => (
        <>   
            {console.log(order)}
            <Container  key={order} id = "cont-style">
                <Row>
                    <h3 id = "card-title"> Order {orderIndex + 1}</h3>
                </Row>
                <Row className = 'mx-auto' lg={3}> 
                    <Col id = "top-buffer" xs='1'>
                        <Card id = "card-style1-o">
                            <Card.Title>Ordered Items</Card.Title>
                            <Card.Body>
                                {
                                    orders[orderIndex].bookOrderList.map((bookItem) =>(

                                        <Row className = "ord-items-list-o" key={bookItem}>
                                            <Col id = "card1-col1-o">
                                                <img id = "card1-image-o" src={bookItem.book.cover} alt={bookItem.book.title} />
                                            </Col>
                                            <Col id = "card1-col2-o">
                                                {bookItem.book.title} ({bookItem.bookQuantity}) 
                                            </Col>
                                            
                                        </Row>
                                    ))
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col id = "top-buffer"  xs='1'>
                        <Card id = "card-style3">
                            <Card.Title>Order Information</Card.Title>
                            <Card.Body> <div id = "sec-title"> Payment Card </div>  {order.payment.type} - Exp ({moment(order.payment.expirationDate).format('MM/YY')}) </Card.Body>
                            <Card.Body> <div id = "sec-title"> Order Total </div>  {formatter.format(order.total)} </Card.Body>
                            <Card.Body> 
                                <div id = "sec-title"> Date Ordered: </div> 
                                {moment(order.orderDate).format('MM-DD-YYYY').toString()} 
                            </Card.Body>
                            <Card.Body> <div id = "sec-title"> Order ID: </div>  {order._id}</Card.Body>
                        </Card>
                    </Col>
                    <Col id = "top-buffer" xs='1'>
                        <Card id = "card-style2">
                            <Card.Title> Shipping Information </Card.Title>
                            <Card.Body> <div id = "sec-title">Address Shipped: </div>  {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}  </Card.Body>
                            <Card.Body> <div id = "sec-title"> Date Shipped: </div>  
                                {
                                    
                                    moment(order.orderDate).format('MM-DD-YYYY').toString()
                                
                                }
                            </Card.Body>
                            <Card.Body> <div id = "sec-title"> Tracking Id: </div>  {Math.floor(10000 + Math.random() * 10000)}</Card.Body>
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
