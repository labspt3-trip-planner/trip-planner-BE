const router = require("express").Router();

const { registerUser } = require("../../firebase/auth/authHelpers.js");
const {
  addUser,
  getByUid,
  getByEmail
} = require("../../database/users/usersHelper");

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    //register user with firebase
    const registered = await registerUser(user);
    console.log("endpoint:", registered);
    if (registered.uid) {
      //add user information to users collection in Cloud Firestore DB
      await addUser(registered);
      res.status(201).json(registered);
    } else {
      //spits back error from firebase
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
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
