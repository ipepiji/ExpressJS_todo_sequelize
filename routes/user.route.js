let express = require('express');
let user = express.Router();
let controller = require('../controllers/user.controller.js');
let { validations } = require('../middlewares');

user.route('/')
    .get(controller.getAll)
    .post(validations.user.body, controller.create);

user.route('/:id')
    .get(controller.getByID)
    .put(validations.user.body, controller.update)
    .delete(controller.delete);

module.exports = user;