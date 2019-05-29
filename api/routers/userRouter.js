const router = require("express").Router();

const { getByUid } = require("../../database/users/usersHelper");

const firebase = require("../../firebase/config/firebase").auth();

//firebase methods list all users
function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  return firebase
    .listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      const userList = [];
      listUsersResult.users.forEach(function(userRecord) {
        console.log("user", userRecord.toJSON());
        userList.push({ uid: userRecord.uid, email: userRecord.email });
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
      return userList;
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}
// console.log(listAllUsers());

// Update user firebase method


// endpoints


// get all users
router.get("/users", async (req, res) => {
  try {
    const userList = await listAllUsers();
    if (userList) {
      res.status(200).json(userList);
    } else {
      res.status(404).json({ err: "Users not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:uid", (req, res) => {
  const { uid } = req.params;

  getByUid(`${uid}`)
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


  // DELETE endpoint delate a user
  router.delete('/delete/:uid'), (req, res) => {

  };


  // PUT endpoint update user info
  router.put('/edit/:uid', (req, res) => {

  });

module.exports = router;
