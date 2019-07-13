const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cool = require("cool-ascii-faces");
const a = require("../database/users/faker");

const authRouter = require("./routers/authRouter.js");
const userRouter = require("./routers/userRouter");
const tripRouter = require("./routers/tripRouter");
const favesRouter = require("./routers/favoritesRouter.js");
const paymentRouter = require("./stripe/paymentRouter");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/trip", tripRouter);
server.use("/favorites", favesRouter);
server.use("/payments", paymentRouter);

// just makes sure the server is live and running
server.get("/", async (req, res) => {
  res.send(`Welcome to the Trip Planner API!`);
});

server.get("/document", (req, res) => {
  res.send("This is an endpoint")
})

// testing faker endpoint
server.get("/faker", (req, res) => {
  res.json(a);
});

// deployment check
server.get("/cool", (req, res) => {
  res.send(cool());
});

module.exports = server;
