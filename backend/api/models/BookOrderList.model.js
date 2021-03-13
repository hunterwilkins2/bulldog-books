const { Schema, model } = require('mongoose')
import orderSchema from './Order.model.js'

const bookOrderListSchema = Schema({
    books: { type: [bookSchema], required: true },
    bookQuantities: { type: [Number], required: true },
    order: { type: orderSchema, required: true},
    shoppingCart: { type: shoppingCartSchema, required: true}
})
    
module.exports = model('BookOrderList', bookOrderListSchema)