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
  title: {
    type: String
  },
  text: {
    type: String
  },
  rating: {
    type: Number
  },
}, {
  timestamps: true
});
module.exports = mongoose.model('Review', reviewSchema);
