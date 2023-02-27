const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  creation: {
    type: Date,
    default: Date.now
  },
  cart: {
    type: Array,
    default: []
  },
  wishlist: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('User', userSchema)
