const express = require('express')
const auth = require('../../auth')
const Promotion = require('../models/Promotion.model')

const router = express.Router()

// Read all promotions
router.get('/', async (req, res, next) => {
    try {
        const promotions = await Promotion.find()
        res.json(promotions)
    } catch(error) {
        next(error)
    }
})

// Create one promotion
router.post('/', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { isbn, 
            title, 
            discount } = req.body

        const promotion = new Promotion({
            isbn: isbn,
            title: title,
            discount: discount })

        await promotion.save()
        res.json(promotion)
    } catch(error) {
        next(error)
    }
})


module.exports = router