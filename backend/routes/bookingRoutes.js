const express = require('express');
const { protect } = require('../middleware/auth');
const { createBooking, getBookedDates, getBookings, deleteBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post('/:id', protect, createBooking);
router.get('/booked_dates', protect, getBookedDates);
router.get('/', protect, getBookings);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
