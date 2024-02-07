const express = require('express');
const { loginUser } = require('../controllers/login');
const { registerUser } = require('../controllers/register');
const { getData, editUser, deleteUser } = require('../controllers/get');
const { verifyOTP } = require('../controllers/verifyemail');
const { verifyToken} = require('../middleware/verify-token');
const uploadMiddleware = require('../middleware/uploadmidle');
const { updateProfile } = require('../controllers/profile');
const User = require('../model');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getData', verifyToken,getData);
router.put('/editUser/:id', editUser);
router.delete('/deleteUser/:id', deleteUser);
router.post('/verify-otp', verifyOTP);
router.post('/verifyToken', verifyToken);

router.post('/updateProfile', uploadMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      let updatedUser = { ...req.body };
  
      if (req.file) {
        const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        updatedUser = { ...updatedUser, profileImage: photoUrl };
  
        // You can save the updated user information to MongoDB here
        // For example, if you have a function called updateUserProfile, you can call it here
        // await updateUserProfile(userId, updatedUser);
      }
  
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
