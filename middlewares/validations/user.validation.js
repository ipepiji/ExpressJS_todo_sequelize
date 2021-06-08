function validateBody(req, res, next) {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            status: "Error",
            message: "Missing request body"
        });

    if (!req.body.name)
        return res.status(400).json({
            status: "Error",
            message: "Missing request body - name"
        });

    if (!req.body.email)
        return res.status(400).json({
            status: "Error",
            message: "Missing request body - email"
        });

    next();
}

module.exports = {
    validateBody
};