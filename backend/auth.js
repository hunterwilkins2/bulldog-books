const jwt = require('jsonwebtoken')

// Max age of the jwt token
const maxAge = 3 * 24 * 60 * 60 // 3 days in secs

const createToken = (id, status, type) => {
    return jwt.sign({ id, status, type }, process.env.RSA_PRIVATE, {
        expiresIn: maxAge
    })
}

const verifyCustomer = (req, res, next) => {
    const token = req.cookies.jwt

    // check if token exist and is valid
    if(token) {
        jwt.verify(token, process.env.RSA_PRIVATE, (error, decodedToken) => {
            if(error) {
                res.status(401).json( { errors: 'Must be logged in'})
                res.redirect('/')
            } else {
                if(decodedToken.status !== 'active') {
                    res.status(403)
                    res.redirect('/confirmation')
                }

                next()
            }
        })
    } else {
        res.status(401).json( { errors: 'Must be logged in'})
        res.redirect('/')
    }
}

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.jwt

    // check if token exist and is valid
    if(token) {
        jwt.verify(token, process.env.RSA_PRIVATE, (error, decodedToken) => {
            if(error) {
                res.redirect(401, '/')
            } else {
                if(decodedToken.userType !== 'admin') {
                    res.redirect('/')
                }

                if(decodedToken.status !== 'active') {
                    res.redirect(403, '/confirmation')
                }
                
                next()
            }
        })
    } else {
        res.redirect(401, '/')
    }
}

module.exports = {
    createToken,
    verifyCustomer,
    verifyAdmin,
    maxAge
}
