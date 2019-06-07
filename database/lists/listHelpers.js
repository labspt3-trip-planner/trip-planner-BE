const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  addItem,
  getById,
  getAllItems,
  getByListName,
  editItem,
  removeItem
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

function getById(tripId, itemId) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .doc(`${itemId}`)
    .get()
    .then(res => res.data())
    .catch(err => 0);
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

function removeItem(tripId, itemId) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .collection("lists")
    .doc(`${itemId}`)
    .get()
    .then(doc => {
      doc.ref
        .delete()
        .then(res => {
          console.log(res);
          return 1;
        })
        .catch(err => {
          console.log(err);
          return 0;
        });
    })
    .catch(err => {
      console.log(err);
      return 0;
    });
}
