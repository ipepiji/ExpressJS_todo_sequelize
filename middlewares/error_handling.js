module.exports.notFound = function (req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    return next(error);
}

/* eslint-disable no-unused-vars */
module.exports.errorHandler = function (error, req, res, next) {
    /* eslint-enable no-unused-vars */
    let statusCode = (res.statusCode !== 200 && res.statusCode !== 201 && error.message !== "Invalid JWT Token") ? res.statusCode : 500;
    statusCode = error.message !== "Invalid Payload" ? res.statusCode : 404;
    return res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
}