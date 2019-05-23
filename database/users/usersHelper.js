const db = require("../../firebase/config/firebase").firestore();

module.exports = {
  addUser,
  getByUid,
  getByEmail
};

function addUser(userInfo) {
  const { uid, email, passwordHash } = userInfo;
  return db
    .collection("users")
    .doc(uid.toString())
    .set({ email, passwordHash });
}

function getByUid(uid) {
  return db
    .collection("users")
    .doc(uid.toString())
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
      return accounts[0];
    })
    .catch(err => console.log("Error getting document", err));
}
