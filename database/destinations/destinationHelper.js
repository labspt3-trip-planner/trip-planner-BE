const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  getById,
  addDestination
};

function getById(id) {
  return db
    .collection("destinations")
    .doc(`${id}`)
    .get()
    .then(res => res.data())
    .catch(err => err);
}

function addDestination(destination) {
  return db
    .collection("destinations")
    .add(destination)
    .then(ref => ref.id)
    .catch(err => err);
}
