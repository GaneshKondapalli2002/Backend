const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Registeruser} = require('../model');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'Failed', message: 'All Fields must be filled' });
    }

    const user = await Registeruser.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: 'Failed', message: 'Incorrect email' });
    }   

    if (!user.verified) {
      return res.status(401).json({ message: 'User is not verified. Please check your email for verification.' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ status: 'Failed', message: 'Incorrect Password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '20m' });

 
    res.status(200).json({ message: 'Login successful', token, "user_data":user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
  }
};


module.exports = {
  loginUser,
};










  //   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ status: 'Failed', message: 'All Fields must be filled' });
//     }

//     const user = await Registeruser.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ status: 'Failed', message: 'Incorrect email' });
//     }

//     if (!user.verified) {
//       return res.status(401).json({ message: 'User is not verified. Please check your email for verification.' });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ status: 'Failed', message: 'Incorrect Password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
//   }
// };

