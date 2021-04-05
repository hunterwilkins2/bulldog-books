const express = require('express')
const Payment = require('../models/Payment.model')
const User = require('../models/User.model')
const auth = require('../../auth')
const mailer = require('../../email')

const router = express.Router()

router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)

        const payments = await Payment.find({ customer: id }, 'type expirationDate')

        res.status(200).json(payments)
    } catch(error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt) 
        const cardCount = await Payment.countDocuments({ customer: id }).exec()

        if(cardCount < 3) {        
            const { cardNumber, type, expirationDate } = req.body
        
            await Payment.create({ customer: id, cardNumber, type, expirationDate })

            const user = await User.findById(id)
            await mailer.sendMail(user.email, 'Bulldawg Books card added', 'A new payment card has been added to your account.')
        
            res.status(200).json({ message: 'Sucessfully added card' })
        } else {
            throw Error('Can only have 3 cards associated with an account')
        }

    } catch(error) {
        next(error)
    }
})

router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        const { paymentId } = req.body

        await Payment.findByIdAndDelete(paymentId)

        const user = await User.findById(id)
        await mailer.sendMail(user.email, 'Bulldawg Books card deleted', 'A payment card has been deleted from your account.')

        res.status(200).json({ message: 'Successfully deleted card' })
    } catch(error) {
        next(error)
    }
})

module.exports = router
