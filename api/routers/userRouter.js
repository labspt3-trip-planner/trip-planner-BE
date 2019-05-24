const router = require("express").Router();

const { getByUid } = require("../../database/users/usersHelper");


router.get('/users', (req, res) => {

});

router.get('/:uid', (req, res) => {
    const { uid } = req.body;

      getByUid(`${uid}`)
      .then(uid => {
        if (uid) {
          res.json(uid)
        } else {
          res.status(404).json({ message: "User with that ID does not exist" });
        }
      })
      .catch(err => {
        res
          .status(404)
          .json({ error: "The user information could not be retrieved." });
      })
  });

module.exports = router;