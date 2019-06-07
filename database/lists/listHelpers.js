const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addItem,
  getAllItems,
  getByListName,
  editItem
};

function addItem(tripId, { item, checked, listName }) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .add({ item, checked, listName: `${listName.toLowerCase()}` })
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

function getByListName(tripId, listName) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .where("listName", "==", `${listName}`)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("There are no matching documents");
        return;
      }
      const l = [];
      snapshot.forEach(doc => l.push(doc.data()));
      return l;
    });
}

function editItem(tripId, itemId, changes) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .doc(`${itemId}`)
    .update(changes)
    .then(res => 1)
    .catch(err => 0);
}
