const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // stripe secret key, I can provide key info if needed.
const router = require('express').Router();
  

router.get("/", (req, res) => {  // Here just to see if it works
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
  });
  

router.post('/checkout', (req, res) =>  {
    (async () => {
        try {
            const charge = await stripe.charges.create({
                amount: Number(req.body.data.payment),
                currency: 'usd',
                source: req.body.data.stripeToken,
                receipt_email: req.body.data.email
            });
            res.status(201).json([{ charge }]);
        } catch (err) {
            res.status(401).json({ err })
        }
    });
})

  module.exports = router;