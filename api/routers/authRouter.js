const router = require("express").Router();

const { registerUser } = require("../../firebase/auth/authHelpers.js");
const { addUser } = require("../../database/users/usersHelper");

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const registered = await registerUser(user);
    console.log("endpoint:", registered);
    if (registered.uid) {
      const didItWork = await addUser(
        registered.uid,
        registered.email,
        registered.passwordHash
      );
      console.log(didItWork);
      res.status(201).json(registered);
    } else {
      res.status(400).json(registered);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "There was a problem processing your request" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // login user
    const login = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Failed to login" });
  }
});

module.exports = router;
