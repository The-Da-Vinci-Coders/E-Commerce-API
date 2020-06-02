const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Product = require('./product')
// const User = require('./user')

const cartSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  // totalCost: {
  //   type: Number
  // },
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
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

cartSchema.virtual('totalCost').get(function () {
  let cost = 0
  if (this.products.length === 0) {
    return cost
  } else {
    for (let i = 0; i < this.products.length; i++) {
      cost += this.products[i].cost
    }
    return cost
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {
  cartSchema,
  Cart
}
