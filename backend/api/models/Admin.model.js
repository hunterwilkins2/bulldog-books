const { Schema, model } = require('mongoose')

// You can create arrow function validators for cleaner code
const requiredString = (message) => ({
    type: String,
    required: [true, message]
})

const adminSchema = new Schema({
    name: requiredString('Admin name is required'),
    email: requiredString('Admin email is required'),
    password: requiredString('Admin password is required'),

    // You can also create validation inline
    phoneNumber: { 
        type: Number,
        required: true,
        validator: { 
            validtor: (v) => /\d{3}-\d{3}-\d{4}/.test(v.toString()),
            message: prop => `${prop} is not a valid phone number`
        }
    }
})

const admin = model('Admin', adminSchema)

module.exports = admin
