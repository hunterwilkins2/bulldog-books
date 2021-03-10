const { Schema, model } = require('mongoose')

const addressSchema = Schema({
    _id: { type: Number, required: true }, // Id should be user's id
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, required: true },
})

module.exports = model('Address', addressSchema)
