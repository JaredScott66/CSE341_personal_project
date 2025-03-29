const router = require('express').Router()
const usersRoute = require('./users');
const shipsRoute = require('./shipRegistry');
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello world']
    res.send('Hello World');
});

router.use('/users', usersRoute);
router.use('/ship-in', shipsRoute);
// router.use('/ship-out', shipsRoute);

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err)};
        res.redirect('/');
    });
});

module.exports = router;