const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const { bufferToDataURI } = require('../services/imageUpload');
const { uploader } = require('../config/cloudinaryConfig');



//Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({id, role}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

const createUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password, phone,
        role } = req.body;

  const profile_picture = req.files.filter((file) => file.fieldname === 'profile_picture');

  if (!first_name || !last_name || !email || !password || !phone || !role || profile_picture.length === 0) {
    res.status(400);
    throw new Error('Please add all fields!');
  }

  if (role === 'user') {
    const userExists = await User.findOne({email});
    if (userExists) {
      res.status(400)
      throw new Error('User already exists!')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
      const { fieldname, mimetype, buffer } = profile_picture[0];
      const fileFormat = mimetype.split('/')[1];
      const fileData = bufferToDataURI(`.${fileFormat}`, buffer).content;
      const result = await uploader.upload(fileData, { public_id: `worka/${email}_${fieldname}`});
  
      //save user
      const user = await User.create({
        email,
        phone,
        first_name,
        last_name,
        role,
        password: hashedPassword,
        status: 'active',
        profile_picture: result.url
      })

      if (user) {
        res.status(201).json({
          _id: user.id,
          email: user.email,
          token: generateToken(user._id, role)
        })
      }
    } catch (err) {
      res.status(400).json({
        message: 'something went wrong while processing your request'
      })
    }
    }
  // const { craftId, locationId, business_name, shop_address, work_image_1, work_image_2 } = req.body;
  // if (role === 'artisan') {
  //   if (!business_name || !shop_address || !craftId || !locationId || !work_image_1 || !work_image_2) {
  //     res.status(400);
  //     throw new Error('Please add all fields!');
  //   }
  //   if (!locationId ) {

  //   }
  // }

})

module.exports = { createUser };
