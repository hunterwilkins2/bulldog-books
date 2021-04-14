const express = require('express')
const User = require('../models/User.model')
const auth = require('../../auth')
const mailer = require('../../email')

const router = express.Router()

router.get('/', auth.verifyEmployee, async (req, res, next) => {
    try {
        const users = await User.find({}, 'status userType firstName lastName email dateJoined recievePromotions')

        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.patch('/promote', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })
        if(user.userType === 'admin') 
            throw Error('Cannot promote an admin user to an employee')

        const employee = await User.findOneAndUpdate({ email },
            { userType: 'employee'},
            { projection: 'status userType firstName lastName email dateJoined recievePromotions', new: true },
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
            { projection: 'status userType firstName lastName email dateJoined recievePromotions', new: true },
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

router.patch('/suspend', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })
        if(user.userType === 'admin') 
            throw Error('Cannot suspend an admin user')

        const suspendedUser = await User.findOneAndUpdate({ email },
            { status: 'suspended'},
            { projection: 'status userType firstName lastName email dateJoined recievePromotions', new: true },
        )
        
        mailer.sendMail(email, 'Bulldawgs Books account unsuspended', suspendedUser.firstName + ', your account has been suspended')

        if(suspendedUser) {
            res.json(suspendedUser)
        } else {
            throw Error('Could not find user')
        }
    } catch(error) {
        next(error)
    }
})

router.patch('/unsuspend', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { email } = req.body
        const suspendedUser = await User.findOne({ email })
        if(suspendedUser.userType === 'admin') 
            throw Error('Cannot unsuspend an admin user')

        const user = await User.findOneAndUpdate({ email }, 
            { status: 'inactive'},
            { projection: 'status userType firstName lastName email dateJoined recievePromotions', new: true },
        )
        
        mailer.sendMail(user.email, 'Bulldawgs Books account unsuspended', user.firstName + ', your account has been unsuspended')

        if(user) {
            res.json(user)
        } else {
            throw Error('Could not find user')
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router
