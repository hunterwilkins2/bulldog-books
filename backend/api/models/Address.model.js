const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const addressSchema = Schema({
    customer: { type: OBJECT_ID, ref: 'User' },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, required: true },
})

module.exports = model('Address', addressSchema)
