const { Schema, model } = require('mongoose')

const userSchema = Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    dateJoined: { type: Date, required: true},
    status: { 
        type: String, 
        enum: ['active', 'inactive', 'suspended'],
        required: true
    },
    userType: { 
        type: String, 
        enum: ['admin', 'customer'],
        required: true
    },
})

module.exports = model('User', userSchema)
