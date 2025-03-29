const router = require('express').Router();
const userController = require('../controllers/usersCon');
const validation = require('../middleware/validate');
const errorH = require('../errors/errorHandler').asyncHandler;
const { isAuthenticated } = require('../middleware/authenticate');
 
router.use('/', require('./swagger'));
// Get all users
router.get('/', 
        //#swagger.tags=['Users']
    userController.getAll);

//Get one user by ID
router.get('/:id',
        //#swagger.tags=['Users']
    userController.getById);

//Post user
router.post('/', isAuthenticated,
        //#swagger.tags=['Users']
    validation.saveContact, userController.createUser);

//Edit user
router.put('/:id', isAuthenticated,
        //#swagger.tags=['Users']
    validation.saveContact, userController.editUser);

//Delete user
router.delete('/:id', isAuthenticated,
        //#swagger.tags=['Users']
    userController.deleteUser);


module.exports = router;