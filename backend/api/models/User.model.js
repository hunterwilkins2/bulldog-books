const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const userSchema = Schema({
    firstName: { type: String, required: [true, 'Please enter your first name'] },
    lastName: { type: String, required: [true, 'Please enter your last name']},
    password: { 
        type: String, 
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    email: { 
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
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
