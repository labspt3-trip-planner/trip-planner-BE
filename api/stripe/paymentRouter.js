const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // stripe secret key, I can provide key info if needed.
const router = require('express').Router();
  

router.get("/", (req, res) => {  // Here just to see if it works
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
  });
  

router.post('/checkout', (req, res) =>  {
console.log(req.body)
    (async () => {
        try {
            const charge = await stripe.charges.create({
                amount: payment,
                currency: 'usd',
                source: stripe,
                receipt_email: email
            });
            res.status(201).json([{ charge }]);
        } catch (err) {
            res.status(401).json({ err })
        }
    });
})

  module.exports = router;