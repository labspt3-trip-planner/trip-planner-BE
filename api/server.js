const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cool = require("cool-ascii-faces");


const authRouter = require("./routers/authRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);

// just makes sure the server is live and running
server.get("/", async (req, res) => {
  res.send(`Welcome to the Trip Planner API!`);
});

// deployment check
server.get("/cool", (req, res) => {
  res.send(cool());
});

module.exports = server;
