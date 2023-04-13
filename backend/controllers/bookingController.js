const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');
const Artisan = require('../models/artisanModel');
const User = require('../models/userModel');

const createBooking = asyncHandler(async (req, res) => {
  const { role } = req.user;
  const id = req.params.id;

  if (role !== 'user') {
    res.status(401);
    throw new Error('Not authorized')
  }

  const artisan = await Artisan.findById(id);

  if (!artisan) {
    res.status(404);
    throw new Error('Artisan not found');
  }

  const { date } = req.body;

  if (!date) {
    res.status(400);
    throw new Error('Please add a valid date');
  }

  const currentDate = new Date()
  const bookingDate = new Date(date);
  
  if ((bookingDate < currentDate) || (isNaN(bookingDate))){
    res.status(400);
    throw new Error('Please provide a valid date');
  }

  const allowedBookingHours = [10, 11, 12, 13, 14, 15, 16];

  if (!allowedBookingHours.includes(bookingDate.getHours())) {
    res.status(400);
    throw new Error('Booking Hours are from 10am to 4pm');
  }

  if (bookingDate.getMinutes() !== 0) {
    res.status(400);
    throw new Error('Booking Times are by the hour e.g: 12:00')
  }
  
  const bookingExists = await Booking.findOne({ date: bookingDate, artisanId: id });

  if (bookingExists) {
    res.status(400);
    throw new Error('Booking already exists')
  }

  const booking = await Booking.create({
    artisanId: artisan._id,
    userId: req.user._id,
    date: bookingDate
  })

  if (booking) {
    artisan.bookings.push(booking._id)
    await artisan.save();
    req.user.bookings.push(booking._id);
    await req.user.save();
    res.status(201).json({ message1: `Booking for ${bookingDate.toLocaleString()} confirmed`} );
  }

});

const getBookedDates = asyncHandler(async (req, res) => {
  const { role } = req.user;

  if (role !== 'artisan') {
    res.status(401);
    throw new Error('Not authorized');
  }

  const artisan = await Artisan.findById(req.user._id).select('-password -__v -createdAt -updatedAt')
  .populate('bookings');

  if (!artisan) {
    res.status(404);
    throw new Error('Artisan not found');
  }

  const currentDate = new Date();
  const bookedDates = {};

  artisan.bookings.forEach(booking => {
    if (booking.date.getMonth() === currentDate.getMonth()) {
      if (bookedDates[booking.date.getDate()]) {
        bookedDates[booking.date.getDate()].push(booking.date.getHours())
      } else {
        bookedDates[booking.date.getDate()] = [booking.date.getHours()]
      }
    }
  })
  res.status(200).send(bookedDates);
})

const getBookings = asyncHandler(async (req, res) => {
  res.status(200).json(req.user.bookings);
})

const deleteBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found')
  }

  if (req.user._id.toString() !== booking.userId.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const artisan = await Artisan.findById(booking.artisanId);

  if (artisan) {
    const bookingIdIndex = artisan.bookings.indexOf(booking._id);
    if (bookingIdIndex >= 0) {
      artisan.bookings.splice(bookingIdIndex, 1);
      artisan.save();
    }
  }
  const userBookingIdIndex = req.user.bookings.indexOf(booking._id);
  if (userBookingIdIndex >= 0) {
    req.user.bookings.splice(userBookingIdIndex, 1);
    req.user.save();
  }
  

  await Booking.deleteOne({ _id: booking._id});
  res.status(200).json({message: `booking with id ${bookingId} has been successfully deleted`});

})
module.exports = { createBooking, getBookedDates, getBookings, deleteBooking };