const { Schema, model } = require('mongoose')
// const { cartItemSchema } = require('./CartItem.schema')

const OBJECT_ID = Schema.Types.ObjectId

const orderSchema = Schema({
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    delivery: { type: Number, required: true },
    total: { type: Number, required: true },
    promotion: { type: OBJECT_ID, ref: 'Promotion' },
    customer: {type: OBJECT_ID, ref: 'User' },
    paymentCard: {type: OBJECT_ID, ref: 'Payment' },
    bookOrderList: {
        type: [{ book: OBJECT_ID, bookQuantity: Number}],
    }
})
    
module.exports = model('Order', orderSchema)
