const db = require("../../firebase/config/firebase").firestore();

module.exports = {
  addUser
};

function addUser(userInfo) {
  const { uid, email, passwordHash } = userInfo;
  return db
    .collection("users")
    .doc(uid.toString())
    .set({ email, passwordHash });
}
