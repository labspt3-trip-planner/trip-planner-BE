const router = require("express").Router();

const {
  getByUid,
  removeUser,
  updateUser,
  getTripsByUser
} = require("../../database/users/usersHelper");

const firebase = require("../../firebase/config/firebase").auth();

//firebase methods list all users
function listAllUsers(nextPageToken) {
  // List batch of users 1000 at a time.
  return firebase
    .listUsers(5, nextPageToken)
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

// delete user firebase method
function deleteUser(uid) {
  return firebase
    .removeUser(uid)
    .then(function() {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
}

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

// get user by ID
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

router.get("/:uid/trips", async (req, res) => {
  const { uid } = req.params;
  try {
    const trips = await getTripsByUser(uid);
    console.log(trips);
    if (trips.length) {
      res.status(200).json(trips);
    } else {
      res.status(404).json({ err: "User has no trips planned" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE endpoint delete a user
router.delete("/delete/:uid", async (req, res) => {
  const uid = req.params;
  try {
    if (uid) {
      res.status(200).json({
        message: "User has been deleted"
      });
    } else {
      res.status(404).json({
        error: "The User with the specified ID does not exist"
      });
    }
  } catch (e) {
    console.log(req.params);
    res.status(500).json(e);
  }
});

// PUT endpoint update user info
router.put("/edit/:uid", (req, res) => {});

module.exports = router;
