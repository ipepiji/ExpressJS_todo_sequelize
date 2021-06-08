module.exports.notFound = function (req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

/* eslint-disable no-unused-vars */
module.exports.errorHandler = function (err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = (res.statusCode !== 200 || res.statusCode !== 201) ? res.statusCode : 500;
    return res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}