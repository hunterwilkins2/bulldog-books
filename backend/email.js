const nodemailer = require('nodemailer')

const sendMail = async (userEmail, subject, text) => {
    // send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: { // Should set these as environment variables
            user: 'bulldawgbooksswe@gmail.com',
            pass: 'BulldawgBooksPassword'
        }
    })
    const mailOptions = {
        from: 'bulldawgbooksswe@gmail.com',
        to: userEmail, 
        subject: subject,
        text: text
    }

    // eslint-disable-next-line no-unused-vars
    await transporter.sendMail(mailOptions)
}

module.exports = { sendMail }
