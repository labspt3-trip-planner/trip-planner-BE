const db = require("../../firebase/config/firebase.js").firestore();

module.exports = {
  getById,
  getByName,
  add
};

function getById(id) {
  return db
    .collection("destinations")
    .doc(`${id}`)
    .get()
    .then(res => res.data())
    .catch(err => err);
}

function getByName(name) {
  return db
    .collection("destinations")
    .where("name", "==", name)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching document");
        return 0;
      }
      const destinations = [];
      snapshot.forEach(doc => {
        destinations.push(doc.ref);
      });
      return destinations[0];
    })
    .catch(err => console.log("getByName: ", err));
}

function add(destination) {
  return db
    .collection("destinations")
    .add(destination)
    .then(ref => ref)
    .catch(err => err);
}
