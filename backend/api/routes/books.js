const express = require('express')
const auth = require('../../auth')
const Book = require('../models/Book.model')

const router = express.Router()

// Read all
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch(error) {
        next(error)
    }
})

router.get('/:keyword', async (req, res, next) => {
    try {
        const books = await Book.find({'title': { '$regex': req.params.keyword, '$options': 'i' }})
        res.json(books)
    } catch(error) {
        next(error)
    }
})

// Read one
router.get('/:isbn', async (req, res, next) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn })
        res.json(book)
    } catch(error) {
        next(error)
    }
})

// Create one
router.post('/', auth.verifyEmployee, async (req, res, next) => {
    try {
        const { title, 
            author, 
            edition, 
            category, 
            cover, 
            isbn, 
            quantity, 
            buyPrice, 
            sellPrice, 
            publicationDate, 
            publisher, 
            threshold } = req.body

        const book = new Book({
            title: title,
            author: author,
            edition: edition,
            category: category,
            cover: cover,
            isbn: isbn,
            quantity: quantity,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            publicationDate: publicationDate,
            publisher: publisher,
            threshold: threshold })

        await book.save()
        res.json(book)
    } catch(error) {
        next(error)
    }
})

router.patch('/:isbn', auth.verifyEmployee, async (req, res, next) => {
    try {
        const patchData = req.body
        const isbn = req.params.isbn
    
        const book = await Book.findOneAndUpdate({ isbn }, patchData, { new: true })

        if(book) {
            res.json(book)
        } else {
            throw Error('Isbn not found')
        }
    } catch(error) {
        next(error)
    }
})

// Delete one
router.delete('/:isbn', auth.verifyEmployee, async (req, res, next) => {
    try {
        await Book.deleteOne({ isbn: req.params.isbn })
        res.status(200).json({ message: 'Successfully deleted book'})
    } catch(error) {
        next(error)
    }
})

module.exports = router
