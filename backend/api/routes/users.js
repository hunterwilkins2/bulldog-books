const express = require('express')
const User = require('../models/User.model')
const auth = require('../../auth')

const router = express.Router()

router.patch('/promote', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })
        if(user.userType === 'admin') 
            throw Error('Cannot promote an admin user to an employee')

        const employee = await User.findOneAndUpdate({ email },
            { userType: 'employee'},
            { projection: 'status userType firstName lastName email dateJoined', new: true },
        )

        if(employee) {
            res.json(employee)
        } else {
            throw Error('Could not find user with email provided')
        }
    } catch(error) {
        next(error)
    }
})

router.patch('/demote', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { email } = req.body
        const employee = await User.findOne({ email })
        if(employee.userType === 'admin') 
            throw Error('Cannot demote an admin user to an employee')

        const user = await User.findOneAndUpdate({ email }, 
            { userType: 'customer'},
            { projection: 'status userType firstName lastName email dateJoined', new: true },
        )

        if(user) {
            res.json(user)
        } else {
            throw Error('Could not find user with email provided')
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router
