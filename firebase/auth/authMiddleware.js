const admin = require("../config/firebase");


function verifyToken(req, res, next) {
  const userToken = req.headers.authorization;
  admin
    .auth()
    .verifyIdToken(userToken)
    .then(decodedToken => {
      req.body.uid = decodedToken.uid;
      return next();
    })
    .catch(err => {
      console.log("Middleware error: ", err);
      res.status(400).json({ err: "Could not verify" });
    });
}

module.exports = verifyToken;
