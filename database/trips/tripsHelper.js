const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addTrip,
  getTripById,
  updateTrip,
  removeTrip,
  appendDestination
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
    .then(res => res.data())
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
    .update({ destinations: destination }, { merge: true })
    .then(res => res)
    .catch(err => err);
}
