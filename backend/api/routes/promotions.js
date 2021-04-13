const express = require('express')
const auth = require('../../auth')
const User = require('../models/User.model')
const mailer = require('../../email')
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
        const { startDate, 
            endDate,
            title, 
            discount } = req.body
        const promotion = new Promotion({
            startDate: startDate,
            endDate: endDate,
            title: title,
            discount: discount })
        await (await User.find({ recievePromotions : true })).forEach(function (doc) {
            mailer.sendMail(doc.email, `New Promotion Code: ${promotion.title}`, `Use the promotion code ${promotion.title} from ${promotion.startDate} to ${promotion.endDate} for ${100 * promotion.discount}% off!`)
        })
        await promotion.save()
        res.json(promotion)
    } catch(error) {
        next(error)
    }
})


module.exports = router