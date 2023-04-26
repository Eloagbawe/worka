const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Artisan = require('../models/artisanModel');
const Craft = require('../models/craftModel');
const Location = require('../models/locationModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const { bufferToDataURI } = require('../services/imageUpload');
const { uploader } = require('../config/cloudinaryConfig');
const mongoose = require('mongoose')



//Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({id, role}, process.env.JWT_SECRET, {
    expiresIn: '2d'
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

  if (profile_picture.length === 0) {
    res.status(400);
    throw new Error('Please add a profile picture');
  }

  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400)
    throw new Error('A User account with this email already exists!')
  }

  const artisanExists = await Artisan.findOne({ email });

  if (artisanExists) {
    res.status(400);
    throw new Error('An Artisan account with this email already exists!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (role === 'user') {
    try {
      //save to cloudinary
      const { fieldname, mimetype, buffer } = profile_picture[0];
      const fileFormat = mimetype.split('/')[1];
      const fileData = bufferToDataURI(`.${fileFormat}`, buffer).content;
      const result = await uploader.upload(fileData,
        { public_id: `${process.env.CLOUDINARY_FOLDER_NAME}/${email}_${fieldname}`});
  
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
          role,
          token: generateToken(user._id, role)
        })
      }
    } catch (err) {
      res.status(400).json({
        message: 'something went wrong while processing your request'
      })
    }
  }

  if (role === 'artisan') {
      const { craftId, locationId, business_name, business_address } = req.body;
      const work_images = req.files.filter((file) => 
        file.fieldname === 'work_image_1' || file.fieldname === 'work_image_2');

      if (!business_name || !business_address || !craftId || !locationId) {
        res.status(400);
        throw new Error('Please add all fields!');
      }

      if (work_images.length !== 2) {
        res.status(400);
        throw new Error('Please add two images of your work');
      }

      const craftExists = await Craft.findById(craftId);

      if (!craftExists) {
        res.status(400);
        throw new Error('CraftId is invalid');
      }

      const locationExists = await Location.findById(locationId);

      if (!locationExists) {
        res.status(400);
        throw new Error('LocationId is invalid');
      }

      const imageUrls = {};
      const images = profile_picture.concat(work_images);
      try {
        for (let file of images) {
          const { fieldname, mimetype, buffer } = file;
          const fileFormat = mimetype.split('/')[1];
          const fileData = bufferToDataURI(`.${fileFormat}`, buffer).content;
          const result = await uploader.upload(fileData, { public_id: `${process.env.CLOUDINARY_FOLDER_NAME}/${email}_${fieldname}`});
          imageUrls[fieldname] = result.url;
        }

        const artisan = await Artisan.create({
          email,
          phone,
          first_name,
          last_name,
          role,
          password: hashedPassword,
          craft: craftId,
          location: locationId,
          business_name,
          business_address,
          status: 'active',
          rating: 0,
          profile_picture: imageUrls.profile_picture,
          work_pictures: {
            work_image_1: imageUrls.work_image_1,
            work_image_2: imageUrls.work_image_2
          }
        })

        if (artisan) {
          res.status(201).json({
            _id: artisan.id,
            email: artisan.email,
            role,
            token: generateToken(artisan._id, role)
          })
        }
        
      } catch (err) {
        res.status(400).json({
          message: 'something went wrong while processing your request'
        })
      }
  }
})

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const regularUser = await User.findOne({ email });

  const artisan = await Artisan.findOne({ email });

  const user = regularUser ? regularUser : artisan;

  if (user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
  })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

})

const getMe = asyncHandler(async (req, res) => {
  // Get dashboard details from req.user

  const { role } = req.user;

  if (role === 'user') {
    await req.user.populate({path: 'reviews bookings', select: 'date text rating createdAt', 
          populate: {path: 'artisanId', select: 'first_name last_name profile_picture phone gender',
          populate: {path: 'craft location', select: 'name city state'}}})
  }

  if (role === 'artisan') {
    await req.user.populate({path: 'reviews bookings', select: 'date text rating createdAt',
        populate: {path: 'userId', select: 'first_name last_name profile_picture phone gender'}})
    await req.user.populate({path: 'craft location', select: 'name city state'})
  }
  
  res.status(200).json(req.user);
})

const updateProfile = asyncHandler(async (req, res) => {
  const { phone, bio, gender } = req.body;
  const { role } = req.user;
  const images = req.files.filter((file) => file.fieldname === 'profile_picture'
    || file.fieldname === 'work_image_1' || file.fieldname === 'work_image_2');

  const imageUrls = {};
  try {
    if (images.length > 0) {
      for (let file of images) {
        const { fieldname, mimetype, buffer } = file;
        if ((role === 'user') && (fieldname !== 'profile_picture')) {
          continue;
        }
        const fileFormat = mimetype.split('/')[1];
        const fileData = bufferToDataURI(`.${fileFormat}`, buffer).content;
        const result = await uploader.upload(fileData, { public_id: `${process.env.CLOUDINARY_FOLDER_NAME}/${req.user.email}_${fieldname}`});
        imageUrls[fieldname] = result.url;
      }
    }

    if (role === 'user') {
      const allowedFields = {
        phone: phone,
        profile_picture: imageUrls.profile_picture,
        gender: gender
      }
      const updatedUser = await User.findByIdAndUpdate(req.user.id, allowedFields, {new: true}).select('-password');
      res.status(200).json(updatedUser)
    }

    if (role === 'artisan') {
      const allowedFields = {
        phone: phone,
        profile_picture: imageUrls.profile_picture,
        bio: bio,
        gender: gender,
        'work_pictures.work_image_1': imageUrls.work_image_1,
        'work_pictures.work_image_2': imageUrls.work_image_2,
      }
      const updatedArtisan = await Artisan.findByIdAndUpdate(req.user.id, {$set: allowedFields}, {new: true}).select('-password')
      res.status(200).json(updatedArtisan);
    }
  } catch (err) {
    res.status(400).json({
      message: 'something went wrong while processing your request'
    })
  }
})

const getProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { role } = req.user;

  if (role === 'user') {
    const artisan = await Artisan.findById(id)
    .select('-password -updatedAt -__v')
    .populate({path: 'reviews', select: 'text rating', populate: {path: 'userId',
    select: 'first_name last_name profile_picture'}})
    .populate({path: 'craft location', select: 'name city state'})


    if (!artisan) {
      res.status(404);
      throw new Error('Artisan not found');
    }
    
    const review = await Review.findOne({ artisanId: artisan._id, userId: req.user.id})
    .select('-__v')
    .populate({path: 'artisanId', select: 'first_name last_name profile_picture',
    populate: {path: 'craft location', select: 'name city state'}})


    res.status(200).json({ ...artisan.toObject(), review: review ? review : null})

  }
  else if (role === 'artisan') {
    const bookingExists = await Booking.findOne({ artisanId: req.user._id, userId: id});
    const reviewExists = await Review.findOne({ artisanId: req.user._id, userId: id});


    if (!bookingExists && !reviewExists) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const user = await User.findById(id)
    .select('-password -reviews -bookings -updatedAt -__v');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }

})

const searchArtisan = asyncHandler(async (req, res) => {
  const { page=1, craftId, locationId } = req.query;
  const limit = 4;

  const { role } = req.user;

  if (role !== 'user') {
    res.status(401);
    throw new Error('Not authorized');
  }

  let query = {}

  if (craftId) {
    query['craft'] = new mongoose.Types.ObjectId(craftId);
  }

  if (locationId) {
    query['location'] = new mongoose.Types.ObjectId(locationId);
  }

  const artisans = await Artisan.aggregate([
    { $match: query },
    { 
      $sort: { "rating": -1 } 
    },
    { $skip: (parseInt(page, 10) - 1) * limit },
    { $limit: limit },
    {
      $project: {
        password: 0, __v: 0, bookings: 0, reviews: 0
      },
    }
  ])


  const result = await Artisan.populate(artisans, {path: 'craft location', select: 'name city state country'});

  const count = await Artisan.find(query).count();

  const totalPages = Math.ceil(count / limit);

  const pageInfo = {
    currentPage: parseInt(page),
    totalPages,
    hasPrevious: (parseInt(page) - 1) >= 1,
    hasNext: (parseInt(page) + 1) <= totalPages
  }

  //res.status(200).send(result);
  res.status(200).json({ result, pageInfo});

})

module.exports = { createUser, loginUser, getMe, updateProfile, getProfile, searchArtisan };
