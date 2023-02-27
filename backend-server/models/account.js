const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Account', accountSchema)
