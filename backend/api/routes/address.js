const express = require('express')
const { Address } = require('../models/Address.model')
const auth = require('../../auth')

const router = express.Router()

router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const address = await Address.findOne({ customer: auth.getId(req.cookies.jwt) })
        res.status(200).send(address)
    } catch(error) {
        next(error)
    }
})

router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { street, city, state, zipcode } = req.body
        const id = auth.getId(req.cookies.jwt) 

        await Address.create(id, street, city, state, zipcode)

        res.status(204).send()
    } catch(error) {
        next(error)
    }
})

router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        await Address.deleteOne({ customer: auth.getId(req.cookies.jwt) })
        res.status(204).send()
    } catch(error) {
        next(error)
    }
})
