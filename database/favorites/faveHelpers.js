const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  add,
  getById
};

function add(favorite) {
  return db
    .collection("favorites")
    .add(favorite)
    .then(ref => ref.id)
    .catch(err => err);
}

function getById(id) {
  return db
    .collection("favorites")
    .doc(`${id}`)
    .get()
    .then(res => res.data())
    .catch(err => err);
}
