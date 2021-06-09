
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let User = require('../database/models/user.model');

module.exports.create = function (req, res, next) {
    let model = new User(req.body);
    model.save()
        .then((user) => {
            if (!user || user.length === 0 || user[0] === 0) {
                const error = new Error("Fail to save new user");
                return next(error);
            }

            return res.status(201).json(user);
        })
        .catch((error) => {
            return next(error);
        });
}

module.exports.getAll = function (req, res, next) {
    User.findAll()
        .then((users) => {
            if (!users || users.length === 0 || users[0] === 0) {
                res.status(404);
                const error = new Error("Users not found");
                return next(error);
            }

            return res.status(200).json(users);
        })
        .catch((error) => {
            return next(error);
        });
}

module.exports.getByID = function (req, res, next) {
    const { id } = req.params;
    User.findByPk(id)
        .then((user) => {
            if (!user || user.length === 0 || user[0] === 0) {
                res.status(404);
                const error = new Error("User not found");
                return next(error);
            }

            return res.status(200).json(user);
        })
        .catch((error) => {
            return next(error);
        });
}

module.exports.update = function (req, res, next) {
    if (!(req.body.name || req.body.email || req.body.password)) {
        res.status(400);
        const error = new Error("Missing request body - name | email | password");
        return next(error);
    }

    const { id } = req.params;
    User.update(req.body, {
        where: {
            id
        }
    }).then((user) => {
        if (!user || user.length === 0 || user[0] === 0) {
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
    const { id } = req.params;
    User.destroy({
        where: {
            id
        }
    }).then((user) => {
        if (!user || user.length === 0 || user[0] === 0) {
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

module.exports.register = function (req, res, next) {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    User.findOrCreate({
        where: {
            email
        },
        defaults: {
            ...req.body,
            password: hashedPassword
        }
    }).then((user) => {
        if (!user || user.length === 0 || !user[1]) {
            res.status(400);
            const error = new Error(`Fail to save new user, email '${email}' already exist`);
            return next(error);
        }

        return res.status(201).json(user[0]);
    }).catch((error) => {
        return next(error);
    });
}

module.exports.login = function (req, res, next) {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email
        }
    }).then((user) => {
        if (!user || user.length === 0 || user[0] === 0) {
            res.status(404);
            const error = new Error("User not found");
            return next(error);
        }

        bcrypt.compare(password, user.password)
            .then((result) => {
                if (!result) {
                    res.status(400);
                    const error = new Error("Wrong password");
                    return next(error);
                }

                const payload = {
                    id: user.id,
                    email: user.email,
                    iat: Math.floor(Date.now() / 1000)
                };

                const expiredTime = {
                    expiresIn: (60 * 60) * 24 * 7   // 1 week
                };

                jwt.sign(payload, process.env.JWT_SECRET, expiredTime, (error, token) => {
                    if (error)
                        return next(error);

                    return res.status(200).json({
                        status: "Success",
                        user,
                        token
                    });
                });
            })
            .catch((error) => {
                return next(error);
            });
    }).catch((error) => {
        return next(error);
    });
}