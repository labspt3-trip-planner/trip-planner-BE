const admin = require("firebase-admin");
const serviceAccount = require("./service-account-key.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://ll-trip-planner.firebaseio.com`
});
