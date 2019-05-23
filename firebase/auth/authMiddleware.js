const admin = require('firebase-admin');

async function verifyToken(req, res, next) {
    const userToken = req.headers.authorization;

    try {
        const decodedToken = await admin.auth().verifyIdToken(userToken);

        if (decodedToken) {
            req.body.uid = decodedToken.uid;

            return next();
        } else {
            return res.status(401).send('Not an authorized user');
        }
    } catch (e) {
        return res.status(401).send('Not an authorized user');
    };
};

module.exports = verifyToken;