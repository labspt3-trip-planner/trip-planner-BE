const db = require("../../firebase/config/firebase.js");

module.exports = {
  add,
  getById
};

function add(favorite) {
  return db
    .collection("favorites")
    .doc()
    .set(favorite)
    .then(ref => ref)
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
