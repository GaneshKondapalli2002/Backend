const express = require('express');
const { connectToDatabase } = require('./database.js');
const setupRoutes = require('./routes/route.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyToken } = require('./middleware/verify-token');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const uploadMiddleware = require('./middleware/uploadmidle');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

// Ensure the 'uploads' directory exists

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Use verifyToken middleware for protected routes
app.use('/getData', verifyToken);

// Include your routes
app.use('/', setupRoutes);

// Set maximum listeners
app.setMaxListeners(15);

// Connect to the database
connectToDatabase();

// Awaiting MongoDB connection outside middleware
(async () => {
  await mongoose.connection.readyState; // Wait for the MongoDB connection to be ready
  app.listen(5000, () => {
    console.log('Server is running...');
  });
})();

// Routes for file upload
  app.post('/uploadPhoto', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const uploadedFile = req.file;
    const photoUrl = `http://localhost:5000/uploads/${uploadedFile.filename}`;

    res.json({ message: 'Photo uploaded successfully', photoUrl });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// // Route for updating profile with file upload middleware
// app.post('/updateProfile', uploadMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let updatedUser = { ...req.body };

//     if (req.file) {
//       const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//       updatedUser = { ...updatedUser, profileImage: photoUrl };

//       // You can save the updated user information to MongoDB here
//       // For example, if you have a function called updateUserProfile, you can call it here
//       // await updateUserProfile(userId, updatedUser);
//     }

//     res.json({ message: 'Profile updated successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
