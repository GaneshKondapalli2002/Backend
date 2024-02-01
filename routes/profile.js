const express = require('express');
const router = express.Router();

const { getProfileById } = require('../controllers/profile'); 

// Use verifyToken middleware for protected routes
app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await getProfileById.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;