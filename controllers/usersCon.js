const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const {Api404Error, Api400Error, Api500Error} = require('../errors/apiErrorObjects');
const errorTools = require('../errors/errorHandler');

const getAll = async (req, res, next) => {
    try {
        //#swagger.tags=['Users']
        const result = await mongodb.getDatabase().db().collection("users").find();
            result.toArray()
            .then((users) => {
                res.setHeader('Content-type', 'applications/json');
                res.status(200).json(users);
            })
            if (!result) {
                throw new Api404Error('No user found')
            }
        } catch (error) {
            errorTools.logError(error)
            next()
        }
};

const getById = async (req, res, next) => {
    try {
        //#swagger.tags=['Users']
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("users").find({_id:userId});
        result.toArray()
        .then((users) => {
            res.setHeader('Content-type', 'applications/json');
            res.status(200).json(users);
        });
        if (!result) {
            throw new Api404Error('No user found')
        }
    } catch (error) {
        errorTools.logError(error)
        next()
    }
};

const createUser = async (req, res, next) => {
    try {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        admin: req.body.admin 
     };
     const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
     if (response.acknowledged) {
         res.status(204).send();
     } 
    } catch (error) {
        res.status(500).json(response.error || 'Some error occured while updating user.');
        console.error(error)
        next(error)
    };
}

const editUser = async (req, res, next) => {
    try {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        admin: req.body.admin 
     };
     const response = await mongodb.getDatabase().db().collection("users").replaceOne({_id:userId}, user);
     if (response.acknowledged) {
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating user.');
     };
    } catch (error) {
        console.error(error)
        next(error);
    };
}

const deleteUser = async (req, res, next) => {
    try {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id:userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user')
    };
    } catch (error) {
        console.error(error)
        next(error)
    };
};

module.exports = {
    getAll,
    getById,
    createUser,
    editUser,
    deleteUser
};