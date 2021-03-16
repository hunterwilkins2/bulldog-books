const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const bookOrderListSchema = Schema({
    books: [{ type: OBJECT_ID, ref: 'Book' }],
    bookQuantities: [{ type: Number, required: true }],
    shoppingCart: { type: OBJECT_ID, ref: 'ShoppingCart' }
})
    
module.exports = model('BookOrderList', bookOrderListSchema)
