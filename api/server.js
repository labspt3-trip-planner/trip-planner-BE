const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cool = require("cool-ascii-faces");
const a = require('../database/users/faker');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // stripe secret key, I can provide account info if needed.

const authRouter = require("./routers/authRouter.js");
const userRouter = require("./routers/userRouter");
const tripRouter = require("./routers/tripRouter");
const favesRouter = require("./routers/favoritesRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/trip", tripRouter);
server.use("/favorites", favesRouter);

// Stripe product, I can move later when we clean our code up before production if needed or wanted.
const product = [
  {
    uuid: 1,
    productName: 'Premium service',
    productDescription: 'Premium service for our app',
    productPrice: 9.99
  }
];

// Stripe end points(can be changed if needed)
server.get('/products/:uuid', (req, res, next) => {
  const productID = req.params.uuid;
  const product = products.filter((product) => {
    return parseInt(productID) === product.uuid;
  });
  if (product[0]) {
    return res.render('product', {productInfo: product[0]});
  }
  return res.send('Product does not exist in our database.');
});

server.post('/users/charge', (req, res, next) => {
  const stripeToken = req.body.stripeToken;
  const price = req.body.price;
  const amount = req.body.price * 100;
  const productName = req.body.name;
  // ensure amount === to avoid fraud
  const product = products.filter((product) => {
    return productName === product.productName && parseFloat(price) === parseFloat(product.productPrice);
  });

  if (product[0]) {
    stripe.charges.create({
      card: stripeToken,
      currency: 'usd',
      amount: amount
    }, (err, charge) => {
      if(err) {
        console.log('here');
        res.send('error');
      } else {
        res.send('success');
      }
    });
  } else {
    console.log('Product name or price does not match our records.');
    res.send('error');
  }
});

// just makes sure the server is live and running
server.get("/", async (req, res) => {
  res.send(`Welcome to the Trip Planner API!`);
});

// testing faker endpoint
server.get('/faker', (req, res) => {
  res.json(a)
})

// deployment check
server.get("/cool", (req, res) => {
  res.send(cool());
});

// stripe checkout session

module.exports = server;
