// const sgmail = require('@sendgrid/mail');


// const API_KEY = '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';

// sgmail.setApiKey(API_KEY)


// const message = {
//     to: 'kondapalliganeshsiva@gmail.com',
//     from:'info@dealdox.io',
//     subject:`Approval confirm for`,
//     text:'Welcome to Dealdox.  ${verificationLink}',
//     html:`<h1>Welcome Dealdox</h1>`
// }

// sgmail.send(message)
// .then(response => console.log('Email sent.....'))
// .catch((error)=> console.log(error.message));


const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kondapalliganeshsiva@gmail.com',
        pass: 'ureu epao urca vpuk',
    },
});

const sendVerificationEmail = async (email, verificationLink) => {
    const mailOptions = {
        from: 'kondapalliganeshsiva@gmail.com',
        to: email,
        subject: 'Confirm your email address',
        text: `Click on this link to verify your email: ${verificationLink}`,
    };
    
     await transporter.sendMail(mailOptions);


};

module.exports = {
    sendVerificationEmail,
};
