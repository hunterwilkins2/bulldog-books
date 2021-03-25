const nodemailer = require('nodemailer')

const sendMail = (userEmail, subject, text) => {
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
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log('Error: ' + err)
        } else {
            console.log('Success: ' + response)
        }
    })
}

module.exports = { sendMail }
