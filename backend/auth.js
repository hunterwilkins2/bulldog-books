const jwt = require('jsonwebtoken')

// Max age of the jwt token
const maxAge = 3 * 24 * 60 * 60 // 3 days in secs

const createToken = (id, status, type) => {
    return jwt.sign({ id, status, type }, process.env.RSA_PRIVATE, {
        expiresIn: maxAge
    })
}

module.exports = {
    createToken,
    maxAge
}
