let User = require('../database/models/user.model');

module.exports.create = function (req, res, next) {
    let model = new User(req.body);
    model.save()
        .then((result) => {
            if (!result || result.length === 0 || result[0] === 0) {
                const error = new Error("Fail to save new user");
                return next(error);
            }

            return res.status(201).json(result);
        })
        .catch((error) => {
            return next(error);
        });
}

module.exports.getAll = function (req, res, next) {
    User.findAll()
        .then((result) => {
            if (!result || result.length === 0 || result[0] === 0) {
                res.status(404);
                const error = new Error("Users not found");
                return next(error);
            }

            return res.status(200).json(result);
        })
        .catch((error) => {
            return next(error);
        });
}

module.exports.getByID = function (req, res, next) {
    User.findByPk(req.params.id)
        .then((result) => {
            if (!result || result.length === 0 || result[0] === 0) {
                res.status(404);
                const error = new Error("User not found");
                return next(error);
            }

            return res.status(200).json(result);
        })
        .catch((error) => {
            return next(error);
        });
}

module.exports.update = function (req, res, next) {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        if (!result || result.length === 0 || result[0] === 0) {
            res.status(404);
            const error = new Error("User not found");
            return next(error);
        }

        return res.status(200).json({
            status: "Success",
            message: `User updated!`
        });
    }).catch((error) => {
        return next(error);
    });
}

module.exports.delete = function (req, res, next) {
    User.destroy({
        where: {
            id: req.params.id,
        }
    }).then((result) => {
        if (!result || result.length === 0 || result[0] === 0) {
            res.status(404);
            const error = new Error("User not found");
            return next(error);
        }

        return res.status(200).json({
            status: "Success",
            message: `User deleted!`
        });
    }).catch((error) => {
        return next(error);
    });
}