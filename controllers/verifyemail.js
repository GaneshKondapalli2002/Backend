const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Registeruser = require('../model');
const { sendVerificationEmail } = require('../mail');
const VerificationToken = require('../model');
const Swal = require('sweetalert2');

const verifyUser = async (req, res) => {  
  try {
    const token = req.query.token;
    const user = await Registeruser.findOne({ verificationToken: token });

    if (user) {
      // Update user status to verified
      user.verified = true;
      await user.save();

      // Send a success response
      res.json({verified: true,  message: "E-mail  verified Successfully" });
      
    } else {
      // Send a failure response
      res.status(404).json({ verified: false, message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ verified: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  verifyUser,
};
