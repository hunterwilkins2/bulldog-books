const { Schema, model } = require('mongoose')
    
const promoSchema = Schema({
    isbn: { type: Number, required: true },
    title: { type: String, required: true },
    discount: { type: Number, required: true },
})
    
promoSchema.index({
    isbn: 'text',
    title: 'text',
})
    
module.exports = model('Promotion', promoSchema)