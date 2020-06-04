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
    .then(card => res.status(201).json({ charge: charge }))
    .catch(next)
})

router.post('/stripe/customer', (req, res, next) => {
  const customer = req.body.customer
  const stripe = require('stripe')('sk_test_51Gq3g3HMAAEaJ64PeEPXPhDFJ1uHfN4czO4lBuAfkmh5a7Fr3AD6yU5ZjlKkCZeBmEgS2DsU7ks5q7p4VKassLMB00B9ej0EKe')
  stripe.customers.create(customer)
    .then(customer => res.status(201).json({ customer: customer }))
    .catch(next)
})

router.post('/stripe/card-token', (req, res, next) => {
  const stripe = require('stripe')('sk_test_51Gq3g3HMAAEaJ64PeEPXPhDFJ1uHfN4czO4lBuAfkmh5a7Fr3AD6yU5ZjlKkCZeBmEgS2DsU7ks5q7p4VKassLMB00B9ej0EKe')
  const card = req.body.card
  stripe.tokens.create({
    card: {
      number: card.number,
      exp_month: card.month,
      exp_year: card.year,
      cvc: card.cvc
    }
  })
    .then(card => res.status(201).json({ card: card }))
    .catch(next)
})

router.patch('/stripe/customer/:id', (req, res, next) => {
  const id = req.params.id
  const customer = req.body.customer
  const stripe = require('stripe')('sk_test_51Gq3g3HMAAEaJ64PeEPXPhDFJ1uHfN4czO4lBuAfkmh5a7Fr3AD6yU5ZjlKkCZeBmEgS2DsU7ks5q7p4VKassLMB00B9ej0EKe')
  stripe.customers.update(
    `${id}`,
    {source: customer.source}
  )
    .then(() => res.sendStatus(201).json({ customer: customer }))
    .catch(next)
})

module.exports = router
