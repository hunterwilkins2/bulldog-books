const { Schema, model } = require('mongoose')

const OBJECT_ID = Schema.Types.ObjectId

const newReleasesSchema = Schema({
    bookId: { type: OBJECT_ID, ref: 'Book' }
})

module.exports = model('NewRelease', newReleasesSchema)
