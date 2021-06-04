const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE,
        logging: false
    }
);

sequelize.sync();

module.exports = sequelize;

module.exports.connect = async function (req, res, next) {
    try {
        await sequelize.authenticate();
        return "success";
    } catch (error) {
        return error;
    }
}