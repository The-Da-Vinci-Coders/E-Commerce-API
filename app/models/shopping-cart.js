const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Product = require('./product')
// const User = require('./user')

const cartSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  totalCost: {
    type: Number
  },
  date: {
    type: Date
  },
  stripeId: String,
  active: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true }
}, {
  timestamps: true
})

module.exports = cartSchema
