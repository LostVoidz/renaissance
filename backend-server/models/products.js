const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  dimensionX: {
    type: Number,
    required: true
  },
  dimensionY: {
    type: Number,
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    default: false
  }

})

module.exports = mongoose.model('Product', productSchema)
