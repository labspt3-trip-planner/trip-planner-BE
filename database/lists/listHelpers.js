const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addItem
};

function addItem(tripId, { item, checked, listName }) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .add({ item, checked, listName })
    .then(res => res.id)
    .catch(err => err);
}
