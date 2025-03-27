const router = require('express').Router();
const shipController = require('../controllers/shipsCon');
const errorHandler = require('../errors/errorHandler');
const validation = require('../utils/validate');

// Get all ships
router.get('/', 
        //#swagger.tags=['Ships']
    shipController.getAll);

//Get one ship by ID
router.get('/:id', 
        //#swagger.tags=['Ships']
    shipController.getById);

//Post ship
router.post('/', 
        //#swagger.tags=['Ships']
    validation.saveShip, shipController.createShip);

//Edit ship
router.put('/:id', 
        //#swagger.tags=['Ships']
    validation.saveShip, shipController.editShip);

//Delete ship
router.delete('/:id', 
        //#swagger.tags=['Ships']
    shipController.deleteShip);

module.exports = router;