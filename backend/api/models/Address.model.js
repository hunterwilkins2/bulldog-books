const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const addressSchema = Schema({
    _id: { type: OBJECT_ID, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, required: true },
})

module.exports = model('Address', addressSchema)
