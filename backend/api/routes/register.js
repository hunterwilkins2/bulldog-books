const express = require('express')
const User = require('../models/User.model')
const Cart = require('../models/Cart.model')
const auth = require('../../auth')

const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            password,
            email
        } = req.body

        const user = await User.create({
            firstName,
            lastName,
            password,
            email,
        })

        await Cart.create({ user: user._id })

        const token = auth.createToken(user._id, user.status, user.userType)
        res.cookie('jwt', token, { httpOnly: true, maxAge: auth.maxAge * 1000, })
        res.cookie('userType', user.userType, { maxAge: auth.maxAge * 1000 })

        res.status(201).json( { user: user._id } )
    } catch (error) {
        res.status(400)

        // Checks if email is unique
        if(error.code === 11000) {
            next(new Error('Email already registered'))
        } else {
            next(error)
        }
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.login(email, password)

        // const token = auth.createToken(user._id, user.status, user.userType)
        // res.cookie('jwt', token, { maxAge: auth.maxAge * 1000 })
        // res.cookie('userType', user.userType, { path: '/', domain: 'localhost', httpOnly: true })

        res.cookie('userType', user.userType, { path: '/', domain: 'localhost', sameSite: 'lax' })
            .status(200)
            .json( { user: user._id })
    } catch(error) {
        res.status(401)

        next(error)
    }
})

router.post('/confirmation', async (req, res, next) => {
    try {
        const id = auth.getId(req.cookies.jwt)
        const { confirmationCode } = req.body

        const user = await User.findById(id)

        if(user.confirmationCode == confirmationCode) {
            await User.findOneAndUpdate( { _id: id}, { status: 'active' })
            res.status(200).json( { message: 'Confirmation successful'})
        } else {
            throw Error('Incorrect confirmation code')
        }
    } catch (error) {
        next(error)
    }   
})

// router.get('/resend-confirmation', async (req, res, next) => {
//     try {
//         const id = auth.getId(req.cookie.jwt)
//         const user = await User.findById(id)

//         // Call email api

//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router
