require('dotenv').config();

let express = require('express');
let cors = require('cors');
let helmet = require("helmet");

let database = require('./database');
let middlewares = require('./middlewares');
let routes = require('./routes');


let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    console.info(`${new Date().toISOString()} => ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/', (req, res, next) => {
    return res.status(200).json({
        status: "Success",
        message: "Health Check, OK!"
    });
});

app.get('/connection/db', async (req, res, next) => {
    let conn = await database.connect();
    if (conn === "success")
        return res.status(200).json({
            status: "Success",
            message: "Database Connection Check, OK!"
        });
    else {
        const error = new Error("Database Connection Check, Fail!");
        next(error);
    }
})

database.connect().then(result => {
    if (result === "success")
        console.info("Connection has been established successfully.");
    else
        console.warn("\x1b[31m", "Unable to connect to the database:");

    app.use("/api/v1", routes);

    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);
})

module.exports = app;