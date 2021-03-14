const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const cart = Schema({
    user: { type: OBJECT_ID, ref: 'User' },
    books: [{ type: OBJECT_ID, ref: 'Book' }],
    totalPrice: { type: NUMBER, default: 0 }
})

module.exports = model('Cart', cart)
