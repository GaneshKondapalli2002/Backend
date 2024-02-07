const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Registeruser} = require('../model');
const { sendVerificationEmail } = require('../mail');
const VerificationToken = require('../model');
const Swal = require('sweetalert2');

const verifyOTP = async (req, res) => {  
  try {
    const { email, otp } = req.body;
    const user = await Registeruser.findOne({ email, verificationToken: otp });

    if (user) {
      // Update user status to verified
      user.verified = true;
      await user.save();

      // Send a success response
      return res.status(200).json({ verified: true, message: "Email verified successfully" });
    } else {
      // Send a failure response if user not found or OTP is incorrect
      return res.status(404).json({ verified: false, message: 'User not found or invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ verified: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  verifyOTP,
};
