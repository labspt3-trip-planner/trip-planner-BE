const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addTrip,
  getTripById
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
    .catch(err => console.log(err));
}
