const express = require('express')
const User = require('../models/User.model')
const auth = require('../../auth')

const router = express.Router()

router.patch('/suspendUser', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { name } = req.body

        const user = await User.findOne({ name })
        if(user.userType === 'admin') 
            throw Error('Cannot suspend an admin user')

        const suspendedUser = await User.findOneAndUpdate({ name },
            { status: 'suspended'},
            { projection: 'status userType firstName lastName email dateJoined', new: true },
        )
        
        mailer.sendMail(userEmail, name+' is now suspended')
    }
        if(suspendedUser) {
            res.json(suspendedUser)
        } else {
            throw Error('Could not find user')
        }
    } catch(error) {
        next(error)
    }
})

router.patch('/unsuspendUser', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { name } = req.body
        const suspendedUser = await User.findOne({ name })
        if(suspendedUser.userType === 'admin') 
            throw Error('Cannot unsuspend an admin user')

        const user = await User.findOneAndUpdate({ name }, 
            { status: 'active'},
            { projection: 'status userType firstName lastName email dateJoined', new: true },
        )
        
         mailer.sendMail(user.email, name+' is now unsuspended)
    }   
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
