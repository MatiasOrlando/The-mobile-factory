const S = require("sequelize");
const db = require("../db/db");

class Order extends S.Model {}

Order.init(
    {
      products: {
        type: S.ARRAY(S.STRING),
        defaultValue: []
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
      }
    },
    { sequelize: db, modelName: "order" }
  );
  
  module.exports = Order;