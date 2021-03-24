const express = require('express')
const User = require('../models/User.model')
const Cart = require('../models/Cart.model')
const auth = require('../../auth')

const router = express.Router()
const nodemailer = require('nodemailer')

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
        res.cookie('jwt', token, { httpOnly: true, maxAge: auth.maxAge * 1000 })
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

        const token = auth.createToken(user._id, user.status, user.userType)
        res.cookie('jwt', token, { httpOnly: true, maxAge: auth.maxAge * 1000 })
        res.cookie('userType', user.userType, { maxAge: auth.maxAge * 1000 })

        res.status(200).json( { user: user._id })
    } catch(error) {
        res.status(401)

        next(error)
    }
})

router.post('/forgetEmail', async (req, res, next) => {
    try {
        // send email
        const email = req.body.email
        console.log(email)
        let password = 'notrealpassword' // TODO: find password from database (after resetting it)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: { // Should set these as environment variables
                user: 'bulldawgbooksswe@gmail.com',
                pass: 'BulldawgBooksPassword'
            }
        })
        const mailOptions = {
            from: 'bulldawgbooksswe@gmail.com',
            to: email, 
            subject: 'New Password',
            text: `Your password for Bulldawg Books has been reset to ${password}`
        }
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.log('err')
                console.log(err)
            } else {
                console.log('success')
                console.log(response)
            }
        })
    } catch(error) {
        res.status(401)

        next(error)
    }
})

module.exports = router
