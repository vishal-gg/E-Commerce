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
  category: {
    type: String,
    required: true
  },
  onSale: Boolean,
  discount: Number,
}, {
    timestamps: true,
    collection: 'products'
});

module.exports = mongoose.model('Product', ProductSchema)