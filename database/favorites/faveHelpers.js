const db = require("../../firebase/config/firebase.js").firestore();
const FieldValue = require("firebase-admin").firestore.FieldValue;
module.exports = {
  add,
  getById,
  addToTrip,
  delFromTrip
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
//Adds data from document to favorites array in trip doc
async function addToTrip(tripId, favoriteId) {
  const trip = await db.collection("trips").doc(`${tripId}`);
  const addition = await db
    .collection("favorites")
    .doc(`${favoriteId}`)
    .get();
  return trip.update({
    favorites: FieldValue.arrayUnion(addition.data())
  });
}

async function delFromTrip(tripId, favoriteId) {
  const user = await db.collection("trips").doc(`${tripId}`);
  const favorite = await db.collection("favorites").doc(`${favoriteId}`);

  return user.update({
    favorites: FieldValue.arrayRemove(favorite.data())
  });
}
