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
    userController.getById);

//Post user
router.post('/', 
        //#swagger.tags=['Users']
    validation.saveContact, userController.createUser);

//Edit user
router.put('/:id', 
        //#swagger.tags=['Users']
    validation.saveContact, userController.editUser);

//Delete user
router.delete('/:id', 
        //#swagger.tags=['Users']
    errorH(userController.deleteUser));


module.exports = router;