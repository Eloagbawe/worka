const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
  },
  state: {
    type: String,
    required: [true, 'Please add a state'],
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
  },
}, {
  timestamps: true
});
module.exports = mongoose.model('Location', locationSchema);
