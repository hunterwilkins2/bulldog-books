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



    // ordersbookOrderList.forEach(cartItem => {
    //     console.log(cartItem)
    // })
    
    // console.log(orders[0].bookOrderList)

    // const bookItems = orders[0].bookOrderList.map((book, bookIndex) => (
    //     <>
    //         {console.log(book)}
    //         {console.log(bookIndex)}
    //     </>
    // ))

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
                        <Card id = "card-style1">
                            <Card.Title>Ordered Items</Card.Title>
                            <Card.Body>
                                {
                                    orders[orderIndex].bookOrderList.map((bookItem) =>(

                                        <Row className = "ord-items-list-o" key={bookItem}>
                                            {bookItem.book.title} ({bookItem.bookQuantity}) 
                                        </Row>
                                    ))
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col id = "top-buffer"  xs='1'>
                        <Card id = "card-style3">
                            <Card.Title>Order Information</Card.Title>
                            <Card.Body> <div id = "sec-title"> Payment Card </div>  {order.payment.type} </Card.Body>
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
                            <Card.Body> <div id = "sec-title">Address Shipped: </div>  address </Card.Body>
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
