const asyncHandler = require('express-async-handler')
const Location = require('../models/locationModel');

const createLocation = asyncHandler(async (req, res) => {
    const { name, admin_key, city='Abuja', state='F.C.T', country='Nigeria' } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Please add a location name!');
    }

    if (!admin_key || admin_key !== process.env.ADMIN_KEY) {
      res.status(403);
      throw new Error('Not authorized');
    }

    try {
      const location = await Location.create({ name, city, state, country });
      res.status(201).json({ message: `A new location ${name} has been created successfully!`,
      name: location.name, city: location.city, country: location.country, id: location._id});
    } catch (err) {
      res.status(400).json({ message: 'An error occurred' });
    }
})

const getLocation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
      res.status(400);
      throw new Error('Please Provide Location Id')
    }
  
    try {
      const location = await Location.findById(id).select('-createdAt -updatedAt -__v');
      res.status(200).json(location);
    } catch (err) {
      res.status(400).json({ message: 'An error occurred' });
    }
})

const getLocations = asyncHandler(async (req, res) => {
    try {
      const location = await Location.find().select('-createdAt -updatedAt -__v').sort('name');
      res.status(200).json(location);
    } catch (err) {
      res.status(400).json({ message: 'An error occurred' });
    }
});

module.exports = { createLocation, getLocation, getLocations};
