const express = require('express')
const User = require('../models/User.model')

const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            password,
            email
        } = req.body

        const dateJoined = Date.now()
        const status = 'inactive'
        const type = 'customer'
        const user = await User.create({
            firstName,
            lastName,
            password,
            email,
            dateJoined,
            status,
            type,
        })

        res.status(201).json(user)
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
