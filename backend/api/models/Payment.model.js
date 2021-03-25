const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const { isCreditCard } = require('validator')

const OBJECT_ID = Schema.Types.ObjectId

const paymentSchema = Schema({
    customer: { type: OBJECT_ID, ref: 'User', required: true},
    cardNumber: 
    { 
        type: String, 
        required: [true, 'Must enter credit card number'],
        unique: true,
        validate: [isCreditCard, 'Credit card number is not valid']
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
