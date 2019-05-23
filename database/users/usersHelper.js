const db = require("../../firebase/config/firebase").firestore();

module.exports = {
  addUser
};

function addUser(uid, email, password) {
  return db
    .collection("users")
    .doc(uid.toString())
    .set({ email, password });
}
