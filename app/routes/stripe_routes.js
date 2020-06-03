const express = require('express')
const router = express.Router()
// const passport = require('passport')
// const requireToken = passport.authenticate('bearer', { session: false })

router.post('/stripe/charge', (req, res, next) => {
  const charge = req.body.charge
  const stripe = require('stripe')('sk_test_51Gq3g3HMAAEaJ64PeEPXPhDFJ1uHfN4czO4lBuAfkmh5a7Fr3AD6yU5ZjlKkCZeBmEgS2DsU7ks5q7p4VKassLMB00B9ej0EKe')
  stripe.charges.create({
    amount: charge.amount,
    currency: 'usd',
    customer: charge.customer
  })
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
