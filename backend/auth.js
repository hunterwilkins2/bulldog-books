const jwt = require('jsonwebtoken')

// Max age of the jwt token
const maxAge = 3 * 24 * 60 * 60 // 3 days in secs

const createToken = (id, status, type) => {
    return jwt.sign({ id, status, type }, process.env.RSA_PRIVATE, {
        expiresIn: maxAge
    })
}

const getId = (token) => {
    var id
    jwt.verify(token, process.env.RSA_PRIVATE, (error, decodedToken) => {
        if(error) {
            throw error
        }

        id = decodedToken.id
    })

    return id
}

const verifyCustomer = (req, res, next) => {
    const token = req.cookies.jwt

    // check if token exist and is valid
    if(token) {
        jwt.verify(token, process.env.RSA_PRIVATE, (error, decodedToken) => {
            if(error) {
                res.status(401)
                next(Error('Must be logged in'))
            } else {
                if(decodedToken.status !== 'active') {
                    res.status(401)
                    next(Error('User must confirm their email'))
                }

                next()
            }
        })
    } else {
        res.status(401)
        next(Error('Must be logged in'))
    }
}

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.jwt
    // check if token exist and is valid
    if(token) {
        jwt.verify(token, process.env.RSA_PRIVATE, (error, decodedToken) => {
            if(error) {
                res.status(401)
                next(Error('Must be logged in'))
            } else {
                if(decodedToken.type !== 'admin') {
                    res.status(403)
                    next(Error('Only admins can access that route'))
                }

                if(decodedToken.status !== 'active') {
                    res.status(401)
                    next(Error('User must confirm their email'))
                }
                next()
            }
        })
    } else {
        res.status(401)
        next(Error('Must be logged in'))
    }
}

module.exports = {
    createToken,
    getId,
    verifyCustomer,
    verifyAdmin,
    maxAge
}
