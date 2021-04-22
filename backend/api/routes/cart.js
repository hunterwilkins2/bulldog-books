const express = require('express')
const Cart = require('../models/Cart.model')
const auth = require('../../auth')

const router = express.Router()

// Add books to cart
router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { bookID, quantity} = req.body
        const id = auth.getId(req.cookies.jwt)

        await Cart.findOne({ user: id}, function(err, doc) {
            if(err)
                return false

            doc.books.push({ book: bookID, bookQuantity: quantity })
            doc.save()
        })

        res.json({ message: 'Book was succefully added' })
    } catch(error) {
        next(error)
    }
})


// Display all books in cart
router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        const cart = await Cart.findOne({ user: id})
        res.json(cart.books)
    } catch(error) {
        next(error)
    }
})


// Delete books from cart
router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { bookID, quantity} = req.body
        const id = auth.getId(req.cookies.jwt)
        let hadError = false
        await Cart.findOne({ user: id }, function(err, doc) {
            if(err)
                return false

            if(doc.books.length == 0) {
                hadError = true
                return false
            }
            
            const index = doc.books.findIndex(element => element.book === bookID && element.bookQuantity == quantity)
            if(index == -1) {
                hadError = true
                return false
            }

            doc.books.splice(index, 1)
            doc.save()
        })

        if(hadError){
            throw Error('Could not delete cart item')
        }

        res.json({ message: 'Book was succefully deleted' })
    } catch(error) {
        next(error)
    }
})

module.exports = router
