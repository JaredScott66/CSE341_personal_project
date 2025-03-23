const router = require('express').Router();
const shipController = require('../controllers/shipsCon');
const errorHandler = require('../errors/errorHandler');
const validation = require('../utils/validate');

// Get all ships
router.get('/', shipController.getAll);

//Get one ship by ID
router.get('/:id', shipController.getById);

//Post ship
router.post('/', validation.saveShip, shipController.createShip);

//Edit ship
router.put('/:id', validation.saveShip, shipController.editShip);

//Delete ship
router.delete('/:id', shipController.deleteShip);

module.exports = router;