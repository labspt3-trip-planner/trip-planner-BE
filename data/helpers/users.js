const firebase = require('../../firebase/config/firebase.js');

const db = firebase.firestore();

module.exports = {
  getByUserName
}

function getByUserName(username) {
  return db.collection('users')
}