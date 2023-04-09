const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController')
const { protect } = require('../middleware/auth')
const { upload } = require('../services/imageUpload');

router.post('/create_account', upload, createUser);

module.exports = router;
