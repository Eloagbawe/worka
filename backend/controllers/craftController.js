const asyncHandler = require('express-async-handler');
const Craft = require('../models/craftModel');

const createCraft = asyncHandler(async (req, res) => {
    const { name, admin_key } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Please add a craft name!');
    }

    if (!admin_key || admin_key !== process.env.ADMIN_KEY) {
      res.status(403);
      throw new Error('Not authorized');
    }

    try {
      const craft = await Craft.create({ name });
      res.status(201).json({ message: `A new craft ${name} has been created successfully!`, id: craft._id, name: craft.name });
    } catch (err) {
      res.status(400).json({ message: 'An error occurred' });
    }
})

const getCraft = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    res.status(400);
    throw new Error('Please Provide Craft Id')
  }

  try {
    const craft = await Craft.findById(id).select('-createdAt -updatedAt -__v');
    res.status(200).json(craft);
  } catch (err) {
    res.status(400).json({ message: 'An error occurred' });
  }
})

const getCrafts = asyncHandler(async (req, res) => {
  try {
    const crafts = await Craft.find().select('-createdAt -updatedAt -__v');
    res.status(200).json(crafts);
  } catch (err) {
    res.status(400).json({ message: 'An error occurred' });
  }
})

module.exports = { createCraft, getCraft, getCrafts };
