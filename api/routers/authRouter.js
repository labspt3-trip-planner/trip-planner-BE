const router = require("express").Router();

const firebase = require("../../firebase/config/firebase.js");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const register = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
        res.status(400).json({ errorCode, errorMessage });
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

module.exports = router;
