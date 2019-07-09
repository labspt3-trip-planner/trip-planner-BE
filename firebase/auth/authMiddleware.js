const admin = require("../config/firebase");

async function verifyToken(req, res, next) {
  const userToken = req.headers.authorization;
  console.log("middleware");
  try {
    console.log(userToken)
    const decodedToken = await admin.auth().verifyIdToken(userToken);

    if (decodedToken) {
      req.body.uid = decodedToken.uid;

      return next();
    } else {
      return res.status(401).send("Not an authorized user");
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send(e.errorInfo);
  }
}

module.exports = verifyToken;
