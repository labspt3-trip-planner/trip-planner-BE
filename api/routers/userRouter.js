const router = require("express").Router();

router.get('/users', (req, res) => {

});

router.get('/users/:id', (req, res) => {
    const { uid } = req.params;

    return db
    .collection('users')
    .doc(uid.toString())
    .get()
    .then(doc => {
        
    })
})

module.exports = router;