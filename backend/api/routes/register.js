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
        // generate new password
        let newPassword = Math.random().toString(36).slice(2)
        // change user password to this new password
        const userEmail = req.body.email
        User.findOneAndUpdate(
            { email : userEmail },
            { password : newPassword}
        )
        // send email
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
            to: userEmail, 
            subject: 'New Password',
            text: `Your password for Bulldawg Books has been reset to ${newPassword}`
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
