const router = require("express").Router();

router.get('/users', (req, res) => {

});

router.get('/users/:id', (req, res) => {
    const { uid } = req.params;

    return db
    .collection('users')
    .getByUid()
    .get()
    .then(user => {
        user[0].isAuth0 = user[0].password ? false : true;
        user[0].password = null;
        return res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to find user by that ID.'})
    });
})

module.exports = router;