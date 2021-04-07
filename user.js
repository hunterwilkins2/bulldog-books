const express = require('express')
const User = require('../models/User.model')
const auth = require('../../auth')

const router = express.Router()

router.patch('/suspendUser', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { name } = req.body

        const user = await User.findOne({ name })
        if(user.userType === 'admin') 
            throw Error('Cannot susbend an admin user')

        const employee = await User.findOneAndUpdate({ name },
            { userType: 'customer'},
            { projection: 'status userType firstName lastName email dateJoined', new: true },
        )
        
        mailer.sendMail(userEmail, name+' is now suspended)

        res.status(200).json({ message: 'suspend was sent to your email' })

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

router.patch('/unsuspendUser', auth.verifyAdmin, async (req, res, next) => {
    try {
        const { name } = req.body
        const employee = await User.findOne({ name })
        if(employee.userType === 'admin') 
            throw Error('Cannot unsusbend an admin user')

        const user = await User.findOneAndUpdate({ name }, 
            { userType: 'customer'},
            { projection: 'status userType firstName lastName email dateJoined', new: true },
        )
        
         mailer.sendMail(userEmail, name+' is now unsuspended)

        res.status(200).json({ message: 'unsuspend was sent to your email' })

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
