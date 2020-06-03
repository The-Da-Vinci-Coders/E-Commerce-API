const express = require('express')
const router = express.Router()
// const passport = require('passport')
// const requireToken = passport.authenticate('bearer', { session: false })

router.post('/stripe/charge', (req, res, next) => {
  const charge = req.body.charge
  const stripe = require('stripe')('pk_test_51Gq3g3HMAAEaJ64PjSp9hCSzsviUDW0rAFxo4mxBVaNW3pcVGPd4cSqLDxdvMb732wtspXeFtlUuSWdfadfnWSQ1008BtvXx70')
  stripe.charges.create({
    amount: charge.amount,
    currency: 'usd'
  })
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
