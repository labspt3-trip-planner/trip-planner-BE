const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addTrip
};

function addTrip(trip) {
  return db
    .collection("trips")
    .add(trip)
    .then(ref => ref.id)
    .catch(err => err);
}

