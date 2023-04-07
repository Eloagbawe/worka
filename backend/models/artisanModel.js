const mongoose = require('mongoose')

const artisanSchema = mongoose.Schema({
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
    bio: {
      type: String
    },
    role: {
      type: String,
      default: 'artisan'
    },
    craft: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Craft'
    },
    profile_picture: {
      type: String
    },
    gender: {
      type: String
    },
    business_name: {
      type: String,
      required: [true, 'Please add your business name']
    },
    business_address: {
      type: String,
      required: [true, 'Please add your business address']
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Please add your business location']
    },
    rating: {
      type: Number
    },
    status: {
      type: String,
      required: true
    },
    work_pictures: [{
      type: String,
      required: [true, 'Please add at least two pictures of your work']
    }],
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
})
module.exports = mongoose.model('Artisan', artisanSchema)
