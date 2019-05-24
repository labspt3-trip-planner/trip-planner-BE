const router = require("express").Router();

const db = require("../../firebase/config/firebase").firestore();

const {
    addUser,
    getByUid,
    getByEmail
  } = require("../../database/users/usersHelper");

router.get('/users', (req, res) => {

});

router.get('/:id', (req, res) => {
    const { uid } = req.params;
  db
      .getByUid(uid)
      .then(uid => {
        if (uid) {
          res.json(uid);
        } else {
          res.status(404).json({ message: "User with that ID does not exist" });
        }
      })
      .catch(err => {
        res
          .status(404)
          .json({ error: "The user information could not be retrieved." });
      });
  });

module.exports = router;