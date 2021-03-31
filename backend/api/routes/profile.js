const express = require('express')
const User = require('../models/User.model')
const auth = require('../../auth')
const mailer = require('../../email')


const router = express.Router()

router.get('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)

        const user = await User.findById(id, 'firstName lastName email recievePromotions')

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

router.patch('/', auth.verifyCustomer, async (req, res, next) => {
    try {
        if(req.body.password) {
            throw Error('Must use reset password route')
        }

        const id = auth.getId(req.cookies.jwt)
        const { firstName, lastName, recievePromotions } = req.body
        
        const user = await User.findByIdAndUpdate(id, { firstName, lastName, recievePromotions }, { new: true})

        mailer.sendMail(user.email, 'Bulldawg Books profile has been update', 'Your profile information has been updated')

        res.status(200).json({ message: 'Successfully updated user information' })

    } catch (error) {
        next(error)
    }
})

module.exports = router
