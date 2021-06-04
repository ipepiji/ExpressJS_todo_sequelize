const validations = require("./validations");
const { notFound, errorHandler } = require("./error_handling");

const middlewares = {
    validations,
    notFound,
    errorHandler
}

module.exports = middlewares;