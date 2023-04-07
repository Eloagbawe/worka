const mongoose = require('mongoose')

const craftSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
}, {
  timestamps: true
});
module.exports = mongoose.model('Craft', craftSchema);
