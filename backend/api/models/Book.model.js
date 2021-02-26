const { Schema, model } = require('mongoose')
    
const bookSchema = Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    edition: { type: Number, required: true },
    category: { type: String, required: true },
    cover: { type: String, required: true },
    isbn: { type: Number, required: true },
    quantity: { type: Number, required: true },
    buyPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    publicationDate: { type: Date, default: Date.now },
    publisher: { type: String, required: true},
    threshold: { type: Number, default: 0 },
})
    
bookSchema.index({
    title: 'text',
    author: 'text',
    isbn: 'text'
})
    
module.exports = model('Book', bookSchema)
