const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
      type: String,
      required: [true, 'Please add a firstname'],
    },
    last_name: {
      type: String,
      required: [true, 'Please add a lastname'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number']
    },
    role: {
      type: String
    },
    profile_picture: {
      type: String
    },
    gender: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    nationality: {
      type: String
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
      } 
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      } 
    ],
}, {
    timestamps: true
});
module.exports = mongoose.model('User', userSchema);
