const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Artisan = require('../models/artisanModel');


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer'))
    {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const role = decoded.role;

      // Get user details from token
      if (role === 'user') {
        req.user = await User.findById(decoded.id).select('-password -__v')
       
      } else {
        req.user = await Artisan.findById(decoded.id).select('-password -__v')
      }
      if (!req.user) {
        res.status(401)
        throw new Error('User not found')
      }
      next();
    } catch (err) {
      res.status(401);

      if (err.message === 'invalid signature' || err.message === 'invalid token') {
        throw new Error('invalid token');
      }
      if (err.message === 'jwt expired') {
        throw new Error('session expired');
      } else {
        throw new Error('Not authorized');
      }
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token');
  }
})

module.exports = { protect };
