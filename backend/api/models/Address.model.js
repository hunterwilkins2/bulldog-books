const { Schema, model } = require('mongoose')
const { isLength } = require('validator')


const OBJECT_ID = Schema.Types.ObjectId

const addressSchema = Schema({
    customer: { type: OBJECT_ID, ref: 'User', required: true },
    street: { type: String, required: [true, 'Please enter an address'] },
    city: { type: String, required: [true, 'Please enter your city'] },
    state: { type: String, required: [true, 'Please enter your state'] },
    zipcode: 
    { 
        type: Number,
        required: [true, 'Please enter your zip code'],
        validate: [isLength, 'Please enter a valid zip code']
    },
})

module.exports = model('Address', addressSchema)
