// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
// const passport = require('passport')

// pull in Mongoose model for examples
const Product = require('../models/product')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
// const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/products', (req, res, next) => {
  Product.find()
    .then(products => {
      return products.map(product => product.toObject())
    })
    .then(products => res.status(200).json({ products: products }))
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => res.status(200).json({ product: product.toObject() }))
    .catch(next)
})

// CREATE
// POST /examples
router.post('/products', (req, res, next) => {
  console.log(req.body.product)
  Product.create(req.body.product)
    .then(product => {
      res.status(201).json({ product: product.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/products/:id', removeBlanks, (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      return product.updateOne(req.body.product)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(example => {
      example.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
