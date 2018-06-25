var nodemailer = require('nodemailer');
let transporter=nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'snetskbone@gmail.com',
        pass: 'SKB_ONE1'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;
