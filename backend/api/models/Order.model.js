const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId;

const orderSchema = Schema({
    _id = { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    delivery: { type: Number, required: true },
    total: { type: Number, required: true },
    promotions: { type: OBJECT_ID, ref: 'Promotion' },
    customer: {type: OBJECT_ID, ref: 'User' },
    paymentCard: {type: OBJECT_ID, ref: 'Payment' },
    bookOrderList: {type: OBJECT_ID, ref: 'BookOrderList' }
})
    
module.exports = model('Order', orderSchema)
