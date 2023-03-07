const S = require("sequelize");
const db = require("../db/db");

class Carrito extends S.Model {}

Carrito.init(
  {
    customerId: {
      type: S.INTEGER,
      allowNull: false,
    },
    productId: {
      type: S.ARRAY(S.INTEGER),
      allowNull: false,
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
    price: {
      type: S.FLOAT,
      allowNull: false,
    },
    shipping_address: {
      type: S.STRING,
      allowNull: false,
    },
    order_email: {
      type: S.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    order_date: {
      type: S.DATE,
      allowNull: false,
    },
    order_status: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "carrito" }
);

module.exports = Carrito;
