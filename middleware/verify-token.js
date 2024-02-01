  const jwt = require('jsonwebtoken');

  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
      
      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ message: 'Access denied. Token has expired.' });
      }
  
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };


  
  module.exports = {
    verifyToken,
    };
  