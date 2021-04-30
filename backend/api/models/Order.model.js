const { Schema, model } = require('mongoose')
const generator = require('generate-password')

const OBJECT_ID = Schema.Types.ObjectId

const orderSchema = Schema({
    orderId: {
        type: String,
        default: generator.generate({ length: 10, numbers: true })
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    delivery: { type: Number, required: true },
    total: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    promotion: { type: OBJECT_ID, ref: 'Promotion' },
    customer: {type: OBJECT_ID, ref: 'User', require: true },
    paymentId: {type: OBJECT_ID, ref: 'Payment', require: true },
    addressId: {type: OBJECT_ID, ref: 'Address', require: true },
    bookOrderList: {
        type: [{ book: OBJECT_ID, bookQuantity: Number}],
    }
})
    
module.exports = model('Order', orderSchema)
