// controllers/profile.js
const { updateUserProfile } = require('../services/profile');

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updatedUser = { ...req.body };

    if (req.file) {
      const photoUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
      updatedUser = { ...updatedUser, photoUrl };

      // You can save the updated user information to MongoDB here
      // For example, if you have a function called updateUserProfile, you can call it here
      // await updateUserProfile(userId, updatedUser);
    }

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { updateProfile };
