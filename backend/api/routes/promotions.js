const express = require('express')
const auth = require('../../auth')
const User = require('../models/User.model')
const mailer = require('../../email')
const Promotion = require('../models/Promotion.model')

const router = express.Router()

// Read all promotions
router.get('/', auth.verifyEmployee, async (req, res, next) => {
    try {
        const promotions = await Promotion.find()
        res.json(promotions)
    } catch(error) {
        next(error)
    }
})

// Create one promotion
router.post('/', auth.verifyEmployee, async (req, res, next) => {
    try {
        const { startDate, 
            endDate,
            title, 
            discount,
            isSent } = req.body

        const doesPromotionExist = await Promotion.find({ title })

        if(doesPromotionExist) {
            throw Error('Promotion with the same title already exists')
        }
        
        const promotion = await Promotion.create({
            startDate: startDate,
            endDate: endDate,
            title: title,
            discount: discount,
            isSent })

        if(isSent) {
            await (await User.find({ recievePromotions : true })).forEach(function (doc) {
                mailer.sendMail(doc.email, `New Promotion Code: ${promotion.title}`, `Use the promotion code ${promotion.title} from ${promotion.startDate} to ${promotion.endDate} for ${100 *promotion.discount}% off!`)
            })
        }

        res.json(promotion)
    } catch(error) {
        next(error)
    }
})

router.post('/send-promotion', auth.verifyEmployee, async (req, res, next) => {
    try {
        const { id } = req.body

        const promotion = await Promotion.findByIdAndUpdate(id, { isSent: true })

        await (await User.find({ recievePromotions : true })).forEach(function (doc) {
            mailer.sendMail(doc.email, `New Promotion Code: ${promotion.title}`, `Use the promotion code ${promotion.title} from ${promotion.startDate} to ${promotion.endDate} for ${100 * promotion.discount}% off!`)
        })
        
        res.json({ message: `${promotion.title} has been emailed to customers`})
        

    } catch(error) {
        next(error)
    }
})

router.patch('/', auth.verifyEmployee, async (req, res, next) => {
    try {
        const { id, 
            startDate, 
            endDate,
            title,
            discount
        } = req.body

        const doesPromotionExist = await Promotion.find({ title })

        if(doesPromotionExist._id != id) {
            throw Error('Promotion with the same title already exists')
        }

        const promotion = await Promotion.findById(id)

        if(!promotion.isSent) {
            await Promotion.findByIdAndUpdate(id, { startDate, endDate, title, discount} )
        } else {
            throw Error('Cannot update a promotion that has already been sent to customers')
        }

    } catch(error) {
        next(error)
    }
})

router.delete('/', auth.verifyEmployee, async (req, res, next) => {
    try {
        const { id } = req.body

        const promotion = await Promotion.findById(id)

        if(!promotion.isSent) { 
            await Promotion.findByIdAndDelete(id)
        } else {
            throw Error('Cannot delete a promotion that has been sent to customers.')
        }

    } catch(error) {
        next(error)
    }
})


module.exports = router
