const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const bestSellerSchema = Schema({
    bookId: { type: OBJECT_ID, ref: 'Book', require: true },
})

module.exports = model('BestSeller', bestSellerSchema)
