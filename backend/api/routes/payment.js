const express = require('express')
const { Payment } = require('../models/Payment.model')
const auth = require('../../auth')

const router = express.Router()

router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const payments = await Payment.find({ customer: auth.getId(req.cookies.jwt) })
        res.status(200).send(payments)
    } catch(error) {
        next(error)
    }
})

router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const cardsSaved = Payment.where({ customer: auth.getId(req.cookies.jwt) }).count()
        if(cardsSaved <= 3) {
            const { cardNumber, type, expirationDate } = req.body
            const id = auth.getId(req.cookies.jwt) 
    
            await Payment.create(id, cardNumber, type, expirationDate)
    
            res.status(204).send()
        } else {
            throw Error('Can only have 3 cards save to an account')
        }
    } catch(error) {
        next(error)
    }
})

router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        await Payment.deleteOne({ customer: auth.getId(req.cookies.jwt) })
        res.status(204).send()
    } catch(error) {
        next(error)
    }
})
