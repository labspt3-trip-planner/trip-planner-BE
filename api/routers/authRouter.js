const router = require("express").Router();

const { registerUser } = require("../../firebase/auth/authHelpers.js");

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const registered = await registerUser(user);
    console.log("endpoint:", registered);
    if (registered.uid) {
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

module.exports = router;
