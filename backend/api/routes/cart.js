const express = require('express')
const Cart = require('../models/Cart.model')
const auth = require('../../auth')
const router = express.Router()

// Delete cart
router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        await Cart.deleteOne({user: id})
    } catch(error) {
        next(error)
    }
})

// Add books to cart
router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { bookID, quantity} = req.body
        const id = auth.getId(req.cookies.jwt)
        const cart = await Cart.findByIdAndDelete(id)
        cart.books.push({book: bookID, bookQuantity: quantity})
    } catch(error) {
        next(error)
    }
})


// Display all books in cart
router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        const cart = await Cart.findByIdAndDelete(id)
        res.json(cart.books)
    } catch(error) {
        next(error)
    }
})


// Delete books from cart
router.delete('/deleteBook', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { bookID, quantity} = req.body
        const id = auth.getId(req.cookies.jwt)
        const cart = await Cart.findByIdAndDelete(id)
        cart.books.pop({book: bookID, bookQuantity: quantity})
    } catch(error) {
        next(error)
    }
})

module.exports = router