const express = require('express')
const Address = require('../models/Address.model')
const auth = require('../../auth')

const router = express.Router()

router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        const address = await Address.findOne({ customer: id }, 'street city state zipcode')
        res.status(200).json(address)
    } catch(error) {
        next(error)
    }
})

router.post('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const { street, city, state, zipcode } = req.body
        const id = auth.getId(req.cookies.jwt) 

        const currentAddress = await Address.findOne({ customer: id })

        if(currentAddress) {
            throw Error('Cannot save more than one address')
        }

        await Address.create({ customer: id, street, city, state, zipcode })

        res.status(200).json({message: 'Successfully added address'})
    } catch(error) {
        next(error)
    }
})

router.patch('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)

        const patchData = req.body
        const address = await Address.findOneAndUpdate({ customer: id }, patchData, { new: true })

        if(address) {
            res.status(200).json({message: 'Succesfully updated address'})
        } else {
            throw Error('Could not find address')
        }
        
    } catch (error) {
        next(error)
    }
})

router.delete('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        await Address.deleteOne({ customer: id })
        res.status(200).json({message: 'Succesfully deleted address'})        
    } catch(error) {
        next(error)
    }
})

module.exports = router
