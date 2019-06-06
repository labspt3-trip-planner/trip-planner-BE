const db = require("../../firebase/config/firebase.js").firestore();
const FieldValue = require("firebase-admin").firestore.FieldValue;
module.exports = {
  add,
  getById,
  addToUser
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
//Adds reference to "favorites" doc at favId to favorites array in user doc
async function addToUser(uid, favId) {
  const user = await db.collection("users").doc(`${uid}`);
  const favorite = await db.collection("favorites").doc(`${favId}`);

  return user.update({
    favorites: FieldValue.arrayUnion(favorite)
  });
}
