const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  isDoctor: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'customer', // other value can be 'admin'
  },
  notification: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model('User', userSchema);
