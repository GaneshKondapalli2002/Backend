// userController.js
const User = require('../model');

// async function updateUserProfile(userId, updatedUserData) {
//   try {
//     // Use Mongoose to update the user profile
//     const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
//     return updatedUser;
//   } catch (error) {
//     throw error;
//   }
// }



module.exports = { updateUserProfile };
