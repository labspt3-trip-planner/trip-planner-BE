const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // stripe secret key, I can provide account info if needed.
const router = require('express').Router();

const stripeToken = require('stripe')(process.env.SERVER_STRIPE_TOKEN);
const { subPlans, subPrices } = require('./paymentHelper');
  

router.post('/checkout', subPlans, subPrices, stripeToken,(req, res) => {
    const stripeToken = req.body.data.stripeToken;
    const payment = Number(req.body.data.payment);
    const subPlans = req.body.data.description;
    const email = req.body.data.email;

    (async () => {
        try {
            const charge = await stripe.charges.create({
                amount: payment,
                currency: 'usd',
                description: subPlans,
                source: stripeToken,
                statement_description: subPlans,
                receipt_email: email
            });
            res.status(201).json([{ charge }]);
        } catch (err) {
            res.status(401).json({ err })
        }
    });
})

  module.exports = router;