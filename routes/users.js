const router = require('express').Router();
const userController = require('../controllers/usersCon');
const validation = require('../utils/validate');
const errorH = require('../errors/errorHandler').asyncHandler

router.use('/', require('./swagger'));
// Get all users
router.get('/', 
        //#swagger.tags=['Users']
    errorH(userController.getAll));

//Get one user by ID
router.get('/:id',
        //#swagger.tags=['Users']
    validation.checkIdString, errorH(userController.getById));

//Post user
router.post('/', 
        //#swagger.tags=['Users']
    validation.saveContact, errorH(userController.createUser));

//Edit user
router.put('/:id', 
        //#swagger.tags=['Users']
    validation.saveContact, errorH(userController.editUser));

//Delete user
router.delete('/:id', 
        //#swagger.tags=['Users']
    errorH(userController.deleteUser));


module.exports = router;