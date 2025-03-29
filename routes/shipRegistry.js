const router = require('express').Router();
const shipController = require('../controllers/shipsCon');
const errorHandler = require('../errors/errorHandler');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all ships
router.get('/', 
        //#swagger.tags=['Ships']
    shipController.getAll);

//Get one ship by ID
router.get('/:id', 
        //#swagger.tags=['Ships']
    shipController.getById);

//Post ship
router.post('/', isAuthenticated,
        //#swagger.tags=['Ships']
    validation.saveShip, shipController.createShip);

//Edit ship
router.put('/:id', isAuthenticated,
        //#swagger.tags=['Ships']
    validation.saveShip, shipController.editShip);

//Delete ship 
router.delete('/:id', isAuthenticated,
        //#swagger.tags=['Ships']
    shipController.deleteShip);

module.exports = router;