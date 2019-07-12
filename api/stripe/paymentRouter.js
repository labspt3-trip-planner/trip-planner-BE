const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

(async () => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        subPlan: {
            items: [{
                plan: 'Premium',
            }],
        },
        success_url: 'https://localhost:9090/success',
        cancel_url: 'https://localhost:9090/cancel',
    });
});

module.exports = router;