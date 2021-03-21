const express = require('express')
const cors = require('cors') // Cross origin sharing
const helmet = require('helmet') // Adds security to requests
const morgan = require('morgan') // Logger
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const middlewares = require('./middlewares')
const books = require('./api/routes/books')
const register = require('./api/routes/register')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log(error))

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// TODO: change get route to return books
app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World'
    })
})

app.use('/api/books', books)
app.use('/', register)

// Error handlers for invalid requests
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

// Starts the server listening on env.PORT or 5000
const port = process.env.SERVER_PORT || 5000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
