const router = require("express").Router();

const { getByUid } = require("../../database/users/usersHelper");

const firebaseAdmin = require('../../firebase/config/firebase').auth()

//firebase list all users
function listAllUsers(nextPageToken) {
  // lists a batch of users, 1000 at a time.
  firebaseAdmin.listUsers(1000, nextPageToken)
  .then(function(listUsers) {
    listUsers.users.forEach(function(userRecord) {
      console.log('user', userRecord.toJSON());
    });
    if (listUsers.pageToken) {
      // lists the next batch
      listAllUsers(listUsers.pageToken);
    }
  })
  .catch(function(error) {
    console.log('Error listing all the users in the DB.', error);
  });
  // Start listing users from the beginning of the users collection, 1000 at a time.
}
listAllUsers();
router.get('/users', (req, res) => {
const { user } = req.body;

  db('users')
  .then(user => {
    res.json(user);
  })
  .catch(() => {
    res.status(500).json({ error: 'Unable to retrieve list of users.'})
  })
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