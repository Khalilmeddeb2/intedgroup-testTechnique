const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No authorization header' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null' || !token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.userId = payload.id;
        req.userRole = payload.role;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'access_token_expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'invalid_token' });
        } else {
            return res.status(401).json({ message: 'unauthorized_request' });
        }
    }
};



exports.authorize = function(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: 'No token provided' });

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  };
};



