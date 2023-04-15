const express = require('express');
const router = express.Router();
const { createUser, loginUser, getMe, updateProfile, getProfile } = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.post('/create_account', createUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/update', protect, updateProfile);
router.get('/:id', protect, getProfile);

module.exports = router;
