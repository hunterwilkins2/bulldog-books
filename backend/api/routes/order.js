const express = require('express')
const User = require('../models/User.model')
const Order = require('../models/Order.model')
const Book = require('../models/Book.model')
const Cart = require('../models/Cart.model')
const Promotion = require('../models/Promotion.model')
const Address = require('../models/Address.model')
const Payment = require('../models/Payment.model')
const auth = require('../../auth')
const mailer = require('../../email')


const router = express.Router()

const createOrderSummary = async (orders) => {
    let summary = []
    for(var order of orders) {
        const books = await findBooks(order.bookOrderList)
        var promotion
        if(order.promotion) {
            promotion = await Promotion.findById(order.promotion)
        }

        const address = await Address.findById(order.addressId)
        const payment = await Payment.findById(order.paymentId, 'type expirationDate')

        summary.push({
            _id: order._id,
            customer: order.customer,
            subtotal: order.subtotal,
            tax: order.tax,
            delivery: order.delivery,
            total: order.total,
            promotion,
            address,
            payment,
            orderDate: order.orderDate,
            bookOrderList: books
        })
    }

    return summary
}

const findBooks = async (cartItemSchema) => {
    const books = []
    for(var book of cartItemSchema) {
        books.push({book: await Book.findById(book.book), bookQuantity: book.bookQuantity})
    }

    return books
}

// Admin view to view all orders
router.get('/all-orders', auth.verifyAdmin, async (req, res, next) => {
    try {
        const orders = await Order.find({})

        const orderSummary = await createOrderSummary(orders)

        res.json(orderSummary)
    } catch(error) {
        next(error)
    }
})

// Customer view to view all of their own orders
router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)

        const orders = await Order.find({ customer: id })

        const orderSummary = await createOrderSummary(orders)

        res.json(orderSummary)
    } catch(error) {
        next(error)
    }
})

// Customer view to view a single order
router.get('/:orderid', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)

        const orders = await Order.findOne({ customer: id,  _id: req.params.orderid })

        const orderSummary = await createOrderSummary([orders])

        res.json(orderSummary)
    } catch(error) {
        next(error)
    }
})

// Creates a new order from the customers cart and empties their cart
router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {

        const id = auth.getId(req.cookies.jwt)
        const { paymentId, addressId, promotionTitle } = req.body

        console.log(paymentId)

        const cart = await Cart.findOne({ user: id })
        const cartBooks = await findBooks(cart.books)

        if(cartBooks.length == 0) {
            throw Error('Cannot create an order with no books')
        }

        let promotionAmount = 0
        var promotion
        if(promotionTitle) {
            promotion = await Promotion.findOne({ title: promotionTitle })

            if(!promotion) {
                throw Error('Invalid promotion title')
            } else if(promotion.startDate > Date.now()) {
                throw Error('Promotion cannot be used. Promotion hasn\'t started yet')
            } else if(promotion.endDate < Date.now()) {
                throw Error('Promotion cannot be used. Promotion has already ended')
            }

            promotionAmount = promotion.discount
        }

        const reducer = (acc, cartBook) => {
            return acc + cartBook.bookQuantity * cartBook.book.sellPrice
        }

        const subtotal = (1 - promotionAmount) * cartBooks.reduce(reducer, 0)
        const delivery = 12.00
        const tax = 0.08 * subtotal
        const total = subtotal + delivery + tax

        const order = await Order.create({ 
            subtotal, 
            tax, 
            delivery, 
            total,
            promotionId: promotion ? promotion._id : null,
            orderDate: Date.now(),
            customer: id,
            paymentId,
            addressId,
            bookOrderList: cart.books
        })

        await Cart.findByIdAndUpdate(cart._id, { books: [] })

        const user = await User.findById(id)

        const emailBody = await createEmailBody(user, order)
        mailer.sendMail(user.email, 'Thank you for your purchase', emailBody)

        res.json(order)
    } catch(error) {
        next(error)
    }
})

const createEmailBody = async (user, order) => {
    const address = await Address.findById(order.addressId)
    var books = ''
    for(var bookId of order.bookOrderList) {
        const book = await Book.findById(bookId.book)
        books += `${book.title} x ${bookId.bookQuantity}\n`
    }

    return `${user.firstName} thank you for your purchase! Your order, ${order.orderId}, will be shipped shortly.
Order summary for ${order.orderId} on ${order.orderDate}:
Shipping address: ${address.street} ${address.city}, ${address.state}
Books ordered:

${books}
Your total: $${order.total.toFixed(2)}`
}

module.exports = router
