const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const paymentSchema = Schema({
    customer: { type: OBJECT_ID, required: true},
    cardNumber: { type: Number, required: true },
    type: { type: String, required: true},
    expirationDate: { type: Date, required: true}
})

module.exports = model('Payment', paymentSchema)
