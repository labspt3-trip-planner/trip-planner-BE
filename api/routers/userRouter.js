const router = require("express").Router();

const { getByUid } = require("../../database/users/usersHelper");

const firebaseAdmin = require('../../firebase/config/firebase').auth()

//firebase list all users
function listAllUsers(nextPageToken) {
  let users = []
  // lists a batch of users, 40 at a time.
  firebaseAdmin.listUsers(5, nextPageToken)
  .then(function(listUsers) {
    // console.log(listUsers);

   return  listUsers
    // listUsers.users.forEach(function(userRecord) {
    //   //console.log('user', userRecord.toJSON());
    //   users.push(userRecord);
    // });
    // if (listUsers.pageToken) {
    //   // lists the next batch
    //   listAllUsers(listUsers.pageToken);
    // }
  })
  .catch(function(error) {
    console.log('Error listing all the users in the DB.', error);
  });
  // Start listing users from the beginning of the users collection, 40 at a time.
  // return users;
}
// console.log(listAllUsers());



// get all users
router.get('/users', async (req, res) => {
  try {
    const users = await firebaseAdmin.listUsers()
console.log(users);
    res.status(200).json( users );
  } catch(error){
    res.status(500).json(error);
  }
});

router.get('/:uid', (req, res) => {
    const { uid } = req.params;

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