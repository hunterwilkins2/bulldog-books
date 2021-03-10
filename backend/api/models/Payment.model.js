const { Schema, model } = require('mongoose')

const paymentSchema = Schema({
    _id: { type: Number, required: true}, // Id should be user's id
    cardNumber: { type: Number, required: true },
    type: { type: String, required: true},
    expirationDate: { type: Date, required: true}
})

module.exports = model('Payment', paymentSchema)
