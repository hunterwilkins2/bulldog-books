const express = require('express')
const Book = require('../models/Book.model')
const BestSeller = require('../models/BestSeller.model')
const auth = require('../../auth')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const bestSellers = await BestSeller.find()

        const bestSellersId = bestSellers.map(bs => bs.bookId)

        const books = await Book.find({ '_id': { $in: bestSellersId } })

        res.status(200).json(books)
    } catch(error) {
        next(error)
    }
})

router.post('/:isbn', auth.verifyAdmin, async (req, res, next) => {
    try {
        const isbn = Number(req.params.isbn)

        const book = await Book.findOne({ isbn })

        if(!book) {
            throw Error('Book not found')
        }

        await BestSeller.create({ bookId: book._id })

        res.status(200).json({ message: 'Book added successfully to best sellers' })
    } catch (error) {
        next(error)
    }
})

router.delete('/:isbn', auth.verifyAdmin, async (req, res, next) => {
    try {
        const isbn = req.params.isbn

        const book = await Book.findOne({ isbn })

        if(!book) {
            throw Error('Book not found')
        }

        await BestSeller.findOneAndDelete({ bookId: book._id})

        res.status(200).json({ message: 'Book deleted successfully from best sellers' })
    } catch (error) {
        next(error)
    }
})

module.exports = router
