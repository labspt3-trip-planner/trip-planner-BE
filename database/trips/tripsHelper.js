const db = require("../../firebase/config/firebase.js");

module.exports = {
  addTrip
};

function addTrip(uid, trip) {
  return db
    .collections(trip)
    .doc()
    .set({ ...trip });
}

