const stripeConfig = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'development'
    ? 'STRIPE_PUBLISHABLE_KEY'
    : 'STRIPE_SECRET_KEY';

const stripe = stripeConfig(STRIPE_SECRET_KEY);

module.exports = stripe;