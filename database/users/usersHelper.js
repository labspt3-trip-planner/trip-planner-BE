const db = require("../../firebase/config/firebase").firestore();

module.exports = {
  addUser,
  getByUid
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
    .get();
}
