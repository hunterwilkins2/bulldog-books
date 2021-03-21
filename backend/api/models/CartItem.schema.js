const { Schema } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const cartItemSchema = Schema({
    book: { type: OBJECT_ID, ref: 'Book', required: true },
    bookQuantity: { type: Number, required: true },
})
    
module.exports = cartItemSchema
