const express = require('express');
const { searchArtisan } = require('../controllers/userController')
const { protect } = require('../middleware/auth')

const router = express.Router();


router.get('/search', protect, searchArtisan);

module.exports = router;
