const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Ships']
    try {
        const result = await mongodb.getDatabase().db().collection("traffic-intake").find();
            result.toArray()
            .then((users) => {
                res.setHeader('Content-type', 'applications/json');
                res.status(200).json(users);
            })
        } catch (error) {
            console.error(error);
        }
};

const getById = async (req, res, next) => {
    //#swagger.tags=['Ships']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("traffic-intake").find({_id:userId});
        result.toArray()
        .then((users) => {
            res.setHeader('Content-type', 'applications/json');
            res.status(200).json(users);
        });
    } catch (error) {
        next(error)
        return error
    }
};

const createShip = async (req, res, next) => {
    //#swagger.tags=['Ships']
    try {
    const ship = {
        shipName: req.body.shipName,
        transponderId: req.body.transponderId,
        weight: req.body.weight,
        portOrigin: req.body.portOrigin,
        licenceIssued: req.body.licenceIssued,
        inspected: req.body.inspected 
     };
     const response = await mongodb.getDatabase().db().collection("traffic-intake").insertOne(ship);
     if (response.acknowledged) {
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating user.');
     };
    } catch (error) {
        console.error(error)
        next(error)
    };
}

const editShip = async (req, res, next) => {
    //#swagger.tags=[Ships']
    try {
    const shipId = new ObjectId(req.params.id);
    const ship = {
        shipName: req.body.shipName,
        transponderId: req.body.transponderId,
        weight: req.body.weight,
        portOrigin: req.body.portOrigin,
        licenceIssued: req.body.licenceIssued,
        inspected: req.body.inspected 
     };
     const response = await mongodb.getDatabase().db().collection("traffic-intake").replaceOne({_id:shipId}, ship);
     if (response.acknowledged) {
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating user.');
     };
    } catch (error) {
        console.error(error)
        next(error)
    };
}

const deleteShip = async (req, res) => {
    //#swagger.tags=['Ships']
    try {
    const shipId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('traffic-intake').deleteOne({_id:shipId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user')
    };
    } catch (error) {
        console.error(error)
    };
};

module.exports = {
    getAll,
    getById,
    createShip,
    editShip,
    deleteShip
}