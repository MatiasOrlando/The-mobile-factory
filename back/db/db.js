const Sequelize = require("sequelize");
const db = new Sequelize("mobile-factory-db", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
