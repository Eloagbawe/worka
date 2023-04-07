const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  artisanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: [true, 'Please add a booking date and time'],
  },
}, {
  timestamps: true
});
module.exports = mongoose.model('Review', reviewSchema);
