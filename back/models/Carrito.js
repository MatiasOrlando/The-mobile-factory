const S = require("sequelize");
const db = require("../db/db");
const Customer = require("./Customer");
const Product = require("./Product");

class Carrito extends S.Model { }

Carrito.init(
  {
    id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
    price: {
      type: S.STRING,
      allowNull: false,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    }
  },
  { sequelize: db, modelName: "carrito" }
);

module.exports = Carrito;
