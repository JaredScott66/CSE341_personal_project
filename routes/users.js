const router = require('express').Router();
const userController = require('../controllers/usersCon');
const validation = require('../utils/validate');


// Get all users
router.get('/', userController.getAll);

//Get one user by ID
router.get('/:id', userController.getById);

//Post user
router.post('/', validation.saveContact, userController.createUser);

//Edit user
router.put('/:id', validation.saveContact, userController.editUser);

//Delete user
router.delete('/:id', userController.deleteUser);


module.exports = router;