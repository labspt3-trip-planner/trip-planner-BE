const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addItem,
  getAllItems
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

function getAllItems(tripId) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("There are no matching documents");
      }
      const items = [];
      snapshot.forEach(doc => items.push(doc.data()));
      return items;
    })
    .catch(err => console.log(err));
}
