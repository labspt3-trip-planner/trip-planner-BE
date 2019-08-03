const db = require("../../firebase/config/firebase.js").firestore();
const FieldValue = require("firebase-admin").firestore.FieldValue;

module.exports = {
  addTrip,
  getTripById,
  updateTrip,
  removeTrip,
  appendDestination,
  removeDestination
};

function addTrip(trip) {
  return db
    .collection("trips")
    .add(trip)
    .then(ref => ref.id)
    .catch(err => err);
}

function getTripById(id) {
  return db
    .collection("trips")
    .doc(`${id}`)
    .get()
    .then(res => {
      return { tripId: res.id, ...res.data() };
    })
    .catch(err => err);
}

function updateTrip(id, changes) {
  return db
    .collection("trips")
    .doc(`${id}`)
    .update({ ...changes })
    .then(res => res)
    .catch(err => err);
}

function removeTrip(id) {
  return db
    .collection("trips")
    .doc(`${id}`)
    .delete();
}

function appendDestination(tripId, destination) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({ destinations: FieldValue.arrayUnion(destination) })
    .then(res => res)
    .catch(err => err);
}

function removeDestination(tripId, destination) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({ destinations: FieldValue.arrayRemove(destination) })
    .then(res => res)
    .catch(err => err);
}
