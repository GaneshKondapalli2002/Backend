const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Registeruser = require('../model');
const { sendVerificationEmail } = require('../mail');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Registeruser.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(401).json({ message: 'User is not verified. Please check your email for verification.' });
    }

    // Generate a JWT token
    const secretKey = process.env.SECRET_KEY || 'defaultSecret';
    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    // Send the token in the response
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getData = async (req, res) => {
    const {token} = req.body;  
  try {
      // it will verify token and give you data
      const userId = req.user.userId;

        let data = await Registeruser.find({}, { email: 1, password: 1, firstname: 1, lastname: 1 });
        res.json(data);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
}

const editUser = async (req, res) => {
  try {
      const { firstname, lastname, email, password } = req.body;
      const userS = await Registeruser.findByIdAndUpdate(req.params.id, { firstname, lastname, email, password }, { new: true });
      res.json(userS);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
}

const deleteUser = async (req, res) =>{
  try {
      await Registeruser.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
};

module.exports = {
  loginUser,
  getData,
  editUser,
  deleteUser
};
