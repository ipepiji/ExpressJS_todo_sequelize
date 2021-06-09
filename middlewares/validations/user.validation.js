let { body, validationResult } = require('express-validator');

module.exports.validate = (method) => {
    switch (method) {
        case "register": {
            return [
                body("name")
                    .exists().withMessage('Name field is required'),
                body("email")
                    .exists().withMessage('Email field is required')
                    .isEmail().withMessage('Invalid email format'),
                body("password")
                    .exists().withMessage('Password field is required')
            ]
        }
        case "login": {
            return [
                body("email")
                    .exists().withMessage('Email field is required')
                    .isEmail().withMessage('Invalid email format'),
                body("password")
                    .exists().withMessage('Password field is required')
            ]
        }
        case "create": {
            return [
                body("name")
                    .exists().withMessage('Name field is required'),
                body("email")
                    .exists().withMessage('Email field is required')
                    .isEmail().withMessage('Invalid email format'),
                body("password")
                    .exists().withMessage('Password field is required')
            ]
        }
        case "update": {
            return [
                body("name")
                    .optional(),
                body("email")
                    .optional()
                    .isEmail().withMessage('Invalid email format'),
                body("password")
                    .optional()
            ]
        }
    }
}

module.exports.checkValidationResult = function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array({ onlyFirstError: true })
        });
    }

    return next();
}