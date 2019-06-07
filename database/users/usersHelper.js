const db = require("../../firebase/config/firebase").firestore();

module.exports = {
  addUser,
  getByUid,
  getByEmail,
  updateUser,
  removeUser,
  getTripsByUser
};

function addUser(userInfo) {
  const { uid, email } = userInfo;
  return db
    .collection("users")
    .doc(uid.toString())
    .set({ email });
}

function getByUid(uid) {
  return db
    .collection("users")
    .doc(`${uid}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        const nope = "No such document";
        return nope;
      } else {
        return doc.data();
      }
    })
    .catch(err => {
      console.log("Error getting document,", err);
    });
}

function getByEmail(email) {
  return db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents");
        return;
      }
      //creates and returns an array containing the user
      const accounts = [];
      snapshot.forEach(doc => {
        accounts.push(doc.data());
      });
      //returns first object in array
      return accounts[0];
    })
    .catch(err => console.log("Error getting document", err));
}
//changes should be object containing key/value pairs to update
function updateUser(uid, changes) {
  return db
    .collection("users")
    .doc(`${uid}`)
    .update({ ...changes })
    .then(res => res)
    .catch(err => err);
}

function removeUser(uid) {
  return db
    .collection("users")
    .doc(uid.toString())
    .delete();
}

function getTripsByUser(uid) {
  return db
    .collection("trips")
    .where("planner", "==", uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching document");
        return 0;
      }
      const trips = [];
      snapshot.forEach(doc => {
        trips.push(doc.data());
      });
      return trips;
    })
    .catch(err => console.log(err));
}
