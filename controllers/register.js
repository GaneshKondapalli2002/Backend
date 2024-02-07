const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Registeruser } = require('../model');
const { sendVerificationEmail } = require('../mail');

const registerUser = async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ status: 'Failed', message: 'All Fields must be filled' });
    }

    const existingUser = await Registeruser.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ status: 'Failed', message: 'Email is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generating OTP
    const otp = generateOTP();

    // Sending OTP via email
    console.log('Sending verification email to:', email);
    await sendVerificationEmail(email, otp);
    console.log('Verification email sent');

    // Storing profile image URL
    const uploadedFile = req.file;
    const profileImage = uploadedFile ? `http://localhost:5000/uploads/${uploadedFile.filename}` : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

    const newUser = new Registeruser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      verificationToken: otp,
      verified: false,
      profileImage
    });

    await newUser.save();

    return res.status(200).json({ status: 'Success', message: 'Successfully Registered!!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
  }
};

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


module.exports = {
  registerUser,
};













// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const {Registeruser} = require('../model');
// const { sendVerificationEmail } = require('../mail');

// const registerUser = async (req, res) => {
//   try {
//     console.log('Received registration request:', req.body);
//     const { email, password, firstname, lastname   } = req.body;

//     if (!email || !password || !firstname || !lastname) {
//       return res.status(400).json({ status: 'Failed', message: 'All Fields must be filled' });
//     }

//     const existingUser = await Registeruser.findOne({ email });

//     if (existingUser) {
//       return res.status(200).json({ status: 'Failed', message: 'Email is already registered' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const verificationToken = crypto.randomBytes(20).toString('hex');
//     const verificationLink = `http://localhost:5000/verify?token=${verificationToken}&redirect=/login`;

//     console.log('Sending verification email to:', email);
    
//     await sendVerificationEmail(email, verificationLink);

//     console.log('Verification email sent');
//     const uploadedFile = req.file;
//     const profileImage = uploadedFile? `http://localhost:5000/uploads/${uploadedFile.filename}`: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

   

//     const newUser = new Registeruser({
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//       verificationToken,
//       verified: false,
//       profileImage
//     });
  
//     await newUser.save();

//     return res.status(200).json({ status: 'Success', message: 'Successfully Registered!!' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
//   }
// };

     
// module.exports = {
//   registerUser,
// };
