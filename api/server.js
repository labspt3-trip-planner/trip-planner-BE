const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cool = require("cool-ascii-faces");

const firebase = require("../firebase/config/firebase.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// just makes sure the server is live and running
server.get("/", async (req, res) => {
  res.send(`Welcome to the Trip Planner API!`);
});

// deployment check
server.get("/cool", (req, res) => {
  res.send(cool());
});

server.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const register = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    console.log(register);
    if (register) {
      res.status(201).json({
        email: register.email,
        uid: register.uid
      });
    } else {
      res
        .status(400)
        .json({ error: "Please include email address and password" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "There was a problem processing your request" });
  }
});

module.exports = server;
