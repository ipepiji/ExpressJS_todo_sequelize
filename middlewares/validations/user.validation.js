module.exports.validateBody = function (req, res, next) {
    if (Object.keys(req.body).length === 0 || !req.body.name || !req.body.email) {
        let msg;

        if (Object.keys(req.body).length === 0)
            msg = "Missing request body";
        else if (!req.body.name)
            msg = "Missing request body - name";
        else if (!req.body.email)
            msg = "Missing request body - email";

        const error = new Error(msg);
        res.status(400);
        return next(error);
    }

    return next();
}