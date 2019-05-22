const admin = require("../config/firebase");

module.exports = {
  registerUser
};

function registerUser(userInfo) {
  return admin
    .auth()
    .createUser(userInfo)
    .then(userRecord => {
      console.log("Successfully created new user:", userRecord.providerData[0]);
      return userRecord;
    })
    .catch(err => {
      console.log("error creating new user:", err.toJSON());
      return err.errorInfo;
    });
}
