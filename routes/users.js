const router = require('express').Router();
const userController = require('../controllers/usersCon');
const errorHandler = require('../errors/errorHandler');

// Get all users
router.get('/', errorHandler.asyncHandler(userController.getAll));

//Get one user by ID
router.get('/:id', errorHandler.asyncHandler(userController.getById));

//Post user
router.post('/', errorHandler.asyncHandler(userController.createUser));

//Edit user
router.put('/:id', errorHandler.asyncHandler(userController.editUser));

//Delete user
router.delete('/:id', errorHandler.asyncHandler(userController.deleteUser));


module.exports = router;