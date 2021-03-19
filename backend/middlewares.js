// route not found error handler
const notFound = (req, res, next) => {
    const error = new Error('Not Found - ' + req.originalUrl)
    res.status(404)
    next(error)
}

// General error handler that gets call when error is passed to next()
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode // Sets status code to 500 if status code wasn't set
    res.status(statusCode)
    res.json({
        errors: error.message
    })
}

module.exports = {
    notFound,
    errorHandler
}
