const mongoose=require('mongoose')

const STRING = MONGOOSE.Schema.Types.String,
      
const DATE = MONGOOSE.Schema.Types.Date,
      
const NUMBER = MONGOOSE.Schema.Types.Number,
      
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId,
    
const BOOK_SCHEMA = MONGOOSE.Schema({

        title: { type: STRING, required: true },

        author: { type: STRING, required: true },

        edition: { type: NUMBER, required: true },

        category: { type: STRING, required: true },

        cover: { type: STRING, required: true },

        isbn: { type: STRING, required: true },

        quantity: { type: NUMBER, required: true },

        Bprice: { type: NUMBER, required: true },

        Sprice: { type: NUMBER, required: true },

        publicationDate: { type: DATE, default: Date.now },

        publisher: { type: STRING, default: 0 },

        threshold: { type: NUMBER, default: 0 },
    }),
    
BOOK_SCHEMA.index({
        title: 'text',
        author: 'text',
        isbn: 'text'
    }),
    
module.export=mongoose.model('mytable', BOOK_SCHEMA)
