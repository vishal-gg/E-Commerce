const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  popular: Boolean,
  onSale: Boolean,
  discount: Number,
}, {
    timestamps: true,
    collection: 'products'
});

module.exports = mongoose.model('Product', ProductSchema)