const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cool = require("cool-ascii-faces");
const a = require('../database/users/faker');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

module.exports = server;
