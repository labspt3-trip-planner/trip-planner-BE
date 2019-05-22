const router = require("express").Router();

const firebase = require("../../firebase/config/firebase.js");
const db = firebase.firestore();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // add user to Firebase auth
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
    // add user to "users" collection in Firestore DB
    await db
      .collection("users")
      .doc(register.user.uid)
      .set({ email: register.user.email });
    res.status(201).json({
      email: register.user.email,
      uid: register.user.uid
    });
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
      .json({ error: "There was a problem logging in" });
  }
});

module.exports = router;
