let express = require('express');
let protected = express.Router();
let unprotected = express.Router();
let controller = require('../controllers/user.controller.js');
let { validations } = require('../middlewares');

// PROTECTED
protected.route('/')
    .get(controller.getAll)
    .post(validations.user.validate('create'), validations.user.checkValidationResult, controller.create);

protected.route('/:id')
    .get(controller.getByID)
    .put(validations.user.validate('update'), validations.user.checkValidationResult, controller.update)
    .delete(controller.delete);


// UNPROTECTED
unprotected.route('/register')
    .post(validations.user.validate('register'), validations.user.checkValidationResult, controller.register);

unprotected.route('/login')
    .post(validations.user.validate('login'), validations.user.checkValidationResult, controller.login);


module.exports = {
    protected,
    unprotected
};