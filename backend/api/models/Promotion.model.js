const { Schema, model } = require('mongoose')
    
const promoSchema = Schema({
    endDate: { type: Date, required: true },
    title: { type: String, required: true },
    discount: { type: Number, required: true },
})

/*
promoSchema.index({
    title: 'text',
})
*/
    
module.exports = model('Promotion', promoSchema)