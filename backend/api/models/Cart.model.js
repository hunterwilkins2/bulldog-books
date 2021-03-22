const { Schema, model } = require('mongoose')
const { cartItemSchema } = require('./CartItem.schema')

const OBJECT_ID = Schema.Types.ObjectId

const cart = Schema({
    user: 
    { 
        type: OBJECT_ID, 
        ref: 'User',
        required: true
    },
    books: {
        type: [cartItemSchema],
        default: () => [{}]
    }
})

module.exports = model('Cart', cart)
