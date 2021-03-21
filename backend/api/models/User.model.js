const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = Schema({
    firstName: { type: String, required: [true, 'Please enter your first name'] },
    lastName: { type: String, required: [true, 'Please enter your last name']},
    password: { 
        type: String, 
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    email: { 
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    dateJoined: 
    { 
        type: Date, 
        required: true,
        default: Date.now
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive', 'suspended'],
        required: true,
        default: 'inactive'
    },
    userType: { 
        type: String, 
        enum: ['admin', 'customer'],
        required: true,
        default: 'customer'
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Sends email to user to activate account
// userSchema.post('save', (doc, next) => {
//     next()
// })

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne( { email })

    if(user) {
        const auth = await bcrypt.compare(password, user.password)

        if(auth) {
            return user
        }
    }

    throw Error('Incorrect email or password password')
}

module.exports = model('User', userSchema)
