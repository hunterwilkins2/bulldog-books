const { Schema, model } = require('mongoose')

const orderSchema = Schema({
    _id = { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    delivery: { type: Number, required: true },
    total: { type: Number, required: true },
    promotions: { type: promotionSchema, required: false },
    customer: {type: customerSchema, required: true},
    paymentCard: {type: userSchema, required: true},
    bookOrderList: {type: bookOrderList, required: true}
})
    
module.exports = model('Order', orderSchema)