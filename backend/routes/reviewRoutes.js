const express = require('express');
const { protect } = require('../middleware/auth')
const { addReview, editReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/:id', protect, addReview);
router.put('/:id', protect, editReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
