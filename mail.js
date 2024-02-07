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

const generateOTP = () => {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
};

const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: 'kondapalliganeshsiva@gmail.com',
        to: email,
        subject: 'Your One Time Password (OTP)',
        text: `please verify E-mail with OTP . Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return otp; // Return the generated OTP
};
module.exports = {
    sendVerificationEmail,
};
