const validator = require('../validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'required|string',
    admin: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveShip = (req, res, next) => {
  const validationRule = {
    shipName: 'required|string',
    transponderId: 'required|string',
    weight: 'required|string',
    portOrigin: 'required|string',
    licenceIssued: 'required|string',
    inspected: 'required|string',
    destination: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const checkIdString = (req, res, next) => {
  const response = req.params.id;
  if (response.length != 25) {
    res.status(412).send({
      success: false,
      error: 'Id is not valid input',
  });
  } else {
    next()
  }
};

module.exports = {
  saveContact,
  saveShip,
  checkIdString
};