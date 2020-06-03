const express = require('express')
const User = require('./../models/user')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// GET all movies, this shows all the movies that are listed to the user
router.get('/shopping-cart/', requireToken, (req, res, next) => {
  User.findById(req.user)
    .populate('shoppingCarts.products')
    .then(handle404)
    .then(user => {
      console.log(user)
      return user.shoppingCarts
    })
    .then(carts => res.status(200).json({ shoppingCart: carts.toObject() }))
    .catch(next)
})

router.get('/shopping-cart/:id', requireToken, (req, res, next) => {
  // get the movie ID from the params
  const id = req.params.id
  console.log(id)
  // get the user thanks to requireToken
  const user = req.user
  console.log(user)
  // find the user's movie
  // return the movie
  User.findOne(user)
    .populate('shoppingCarts.products')
    .then(handle404)
    .then(user.shoppingCarts.id(id))
    .then(cart => res.status(200).json({ shoppingCart: cart.toObject() }))
    .catch(next)
})

router.patch('/shopping-cart', requireToken, (req, res, next) => {
  const shoppingCart = req.body.shoppingCart
  const user = req.user
  User.findById(user)
    .then(user => {
      user.shoppingCarts.push(shoppingCart)
      return user.save()
    })
    // making sure the request returns the CARTS
    .then(currUser => res.status(201).json({ shoppingCarts: currUser.shoppingCarts.toObject() }))
    .catch(next)
})

// add product to cart
router.patch('/shopping-cart/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const product = req.body.product
  const user = req.user
  User.findById(user)
    .then((user) => {
      const shoppingCart = user.shoppingCarts.id(id) // returns a matching subdocument
      console.log(user.shoppingCarts)
      shoppingCart.products.push(product._id) // updates the address while keeping its schema
      return user.save() // saves document with subdocuments and triggers validation
    })
    .then(shoppingCart => res.sendStatus(204))
    .catch(next)
})

router.patch('/shopping-cart/:id/products', requireToken, (req, res, next) => {
  const id = req.params.id
  const product = req.body.product
  const productId = product._id
  const user = req.user
  User.findById(user)
    .then(handle404)
    .then(user => {
      const shoppingCart = user.shoppingCarts.id(id)
      shoppingCart.products = shoppingCart.products.filter(product => product != productId)
      // user.shoppingCarts.products = newProducts
      // console.log(user.shoppingCarts.products)
      return shoppingCart.parent().save()
    })
    .then(shoppingCart => res.sendStatus(204))
    .catch(next)
})

module.exports = router
