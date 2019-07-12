const stripe = require('../stripe/stripeConfig');

const stripeCharge = res => (stripeErr, stripeRes) => {
    if(stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
}

const stripePayment = router => {
    router.get('/checkout', (req, res) => {
        res.send({ message: 'Hello Stripe server!', timestamp: new Date().toISOString() });
    });

    router.post('/checkout', (req, res) => {
        stripe.charges.create(req.body, stripeCharge)
    });


    return router;
};

module.exports = stripePayment;