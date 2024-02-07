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
const { Registeruser } = require('./model');
const { RegisteruserSchema } = require('./model');


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

// Ensure the 'uploads' directory exists

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // specify the destination folder
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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

app.post('/uploadPhoto', upload.single('file'), async (req, res) => {
  try {
    // Assuming you save the filename in the MongoDB document
    const photoUrl = req.file.filename;

    // Assuming you have a User model
    const userId = req.Registeruser; // Access user ID from req.user

    // Update the user's profileImage field in MongoDB
    const updatedUser = await Registeruser.findByIdAndUpdate(userId, { profileImage: photoUrl }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ photoUrl });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Error uploading photo' });
  }
});




app.post('/updateProfile/:userId', upload.single('file'), async (req, res) => {
  try {
    const userId = req.params.userId;
    let updatedUser = { ...req.body };

    if (req.file) {
      const photoUrl = req.file.filename;

      updatedUser = await Registeruser.findByIdAndUpdate(userId, { profileImage: photoUrl }, { new: true });

      // Update the default image URL in MongoDB
      await Registeruser.updateOne({}, { $set: { profileImage: photoUrl } });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

