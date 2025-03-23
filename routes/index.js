const router = require('express').Router()
const usersRoute = require('./users');
const shipsRoute = require('./shipRegistry');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello world']
    res.send('Hello World');
});

router.use('/users', usersRoute);
router.use('/ship-in', shipsRoute);
// router.use('/ship-out', shipsRoute);

module.exports = router;