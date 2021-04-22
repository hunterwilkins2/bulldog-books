const express = require('express')
const User = require('../models/User.model')
const Order = require('../models/Order.model')
const Book = require('../models/Book.model')
const Cart = require('../models/Cart.model')
const Promotion = require('../models/Promotion.model')
const auth = require('../../auth')
const mailer = require('../../email')

const router = express.Router()

const findBooks = async (cartItemSchema) => {
    const books = []
    for(var book in cartItemSchema) {
        books.push({book: await Book.findById(book.book), bookQuantity: book.bookQuantity})
    }

    return books
}

// router.get('/all-orders', auth.verifyAdmin, async (req, res, next) => {
//     try {
//         const orders = Order.find()

//         console.log(orders)

//         req.json(orders)
//     } catch(error) {
//         next(error)
//     }
// })

router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)

        const orders = await Order.findOne({ customer: id }, 'subtotal, tax, delivery, total, promotion, bookOrderList')

        orders.promotion = await Promotion.findById(orders.promotion)
        const ids = orders.bookOrderList.map(schema => schema.book)
        orders.bookOrderList = await Book.find({ '_id': { $in: ids } })

        req.json(orders)
    } catch(error) {
        next(error)
    }
})

// router.get('/:orderid', auth.verifyCustomer, async (req, res, next) => {
//     try {
//         const id = auth.getId(req.cookies.jwt)

//         const orders = await Order.findOne({ customer: id,  _id: req.parmas.orderid }, '_id, subtotal, tax, delivery, total, promotion, bookOrderList')

//         orders.promotion = await Promotion.findById(orders.promotion)
//         const ids = orders.bookOrderList.map(schema => schema.book)
//         orders.bookOrderList = await Book.find({ '_id': { $in: ids } })

//         req.json(orders)
//     } catch(error) {
//         next(error)
//     }
// })

router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {

        const id = auth.getId(req.cookies.jwt)
        const { paymentId, promotionTitle } = req.body

        const cart = await Cart.findOne({ user: id })
        const cartBooks = await findBooks(cart.bookOrderList)
        const promotion = await Promotion.findOne(promotionTitle)

        if(!promotion) {
            throw Error('Invalid promotion title')
        } else if(promotion.startDate < Date.now()) {
            throw Error('Promotion cannot be used. Promotion hasn\'t started yet')
        } else if(promotion.endDate > Date.now()) {
            throw Error('Promotion cannot be used. Promotion has already ended')
        }

        const promotionAmount = promotion.discount
        const subtotal = (1 - promotionAmount) * cartBooks.reduce(0, (acc, book) => acc + book.bookQuantity * book.sellPrice)
        const delivery = 12.00
        const tax = 0.08 * subtotal
        const total = subtotal + delivery + tax

        const order = await Order.create({ 
            subtotal, 
            tax, 
            delivery, 
            total,
            promotionId: promotion._id,
            customer: id,
            paymentId,
            bookOrderList: cart.books
        })

        const user = await User.findById(id)

        mailer.sendMail(user.email, 'Thank you for your purchase', `${user.firstName} your order will be delivered shortly`)

        req.json(order)
    } catch(error) {
        next(error)
    }
})

module.exports = router
