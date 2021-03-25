const express = require('express')
const Payment = require('../models/Payment.model')
const auth = require('../../auth')

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

router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt) 
        const cardCount = await Payment.countDocuments({ customer: id }).exec()

        if(cardCount <= 3) {        
            const { cardNumber, type, expirationDate } = req.body
        
            await Payment.create({ customer: id, cardNumber, type, expirationDate })
        
            res.status(200).send('Sucessfully added card')
        } else {
            throw Error('Can only have 3 cards associated with an account')
        }

    } catch(error) {
        next(error)
    }
})

router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { paymentId } = req.body

        await Payment.findByIdAndDelete(paymentId)
        res.status(200).send('Successfully deleted card')
    } catch(error) {
        next(error)
    }
})

module.exports = router
