const db = require("../../firebase/config/firebase.js").firestore();
const FieldValue = require("firebase-admin").firestore.FieldValue;

module.exports = {
  addTodo,
  addPacking,
  removeTodo,
  removePacking,
  checkTodo,
  checkPacking
};

// function addItem(tripId, { item, checked, listName }) {
//   return db
//     .collection("trips")
//     .doc(`${tripId}`)
//     .collection("lists")
//     .add({ item, checked, listName: `${listName.toLowerCase()}` })
//     .then(res => res.id)
//     .catch(err => err);
// }

function addTodo(tripId, todo) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({ todos: FieldValue.arrayUnion(todo) })
    .then(res => res)
    .catch(err => err);
}

function addPacking(tripId, packing) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({ packing: FieldValue.arrayUnion(packing) })
    .then(res => res)
    .catch(err => err);
}

function removeTodo(tripId, todo) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({ todos: FieldValue.arrayRemove(todo) })
    .then(res => res)
    .catch(err => err);
}

function removePacking(tripId, pack) {
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({ packing: FieldValue.arrayRemove(pack) })
    .then(res => res)
    .catch(err => err);
}

function checkTodo(tripId, todo) {
  console.log("DB Helper todo log: ", todo);
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({
      todos: FieldValue.arrayRemove({ item: todo.item, done: !todo.done })
    })
    .then(res =>
      db
        .collection("trips")
        .doc(`${tripId}`)
        .update({ todos: FieldValue.arrayUnion(todo) })
        .then(res => {
          console.log("Second success: ", res);
          return res;
        })
        .catch(err => err)
    )
    .catch(err => err);
}

function checkPacking(tripId, pack) {
  console.log("DB Helper packing log: ", pack);
  return db
    .collection("trips")
    .doc(`${tripId}`)
    .update({
      packing: FieldValue.arrayRemove({ item: pack.item, done: !pack.done })
    })
    .then(res =>
      db
        .collection("trips")
        .doc(`${tripId}`)
        .update({ packing: FieldValue.arrayUnion(pack) })
        .then(res => {
          console.log("Second success: ", res);
          return res;
        })
        .catch(err => err)
    )
    .catch(err => err);
}
