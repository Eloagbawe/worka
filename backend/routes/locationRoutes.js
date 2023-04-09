const express = require('express');
const router = express.Router();

const { createLocation, getLocation, getLocations } = require('../controllers/locationController');

router.post('/', createLocation);
router.get('/:id', getLocation).get('/', getLocations);

module.exports = router;