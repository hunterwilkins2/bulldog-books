const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const { isLength } = require('validator')

const OBJECT_ID = Schema.Types.ObjectId

const paymentSchema = Schema({
    customer: { type: OBJECT_ID, ref: 'User' },
    cardNumber: 
    { 
        type: String, 
        required: [true, 'Must enter credit card number'],
        unique: true,
        validate: [(str) => isLength(str, { min: 16, max: 16 }), 'Not a valid credit card. Must be 16 digits long']

    },
    type: 
    { 
        type: String,
        enum: ['Visa', 'American Express', 'MasterCard'],
        required: true
    },
    expirationDate: { type: Date, required: true}
})

paymentSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.cardNumber = await bcrypt.hash(this.cardNumber, salt)
    next()
})

module.exports = model('Payment', paymentSchema)
