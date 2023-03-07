const S = require("sequelize");
const db = require("../db/db");

class Customer extends S.Model {}

Customer.init(
  {
    email: {
      type: S.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: S.STRING,
      allowNull: false,
    },
    billing_address: {
      type: S.STRING,
      allowNull: false,
    },
    default_shipping_address: {
      type: S.STRING,
      allowNull: false,
    },
    country: {
      type: S.STRING,
      allowNull: false,
    },
    phone: {
      type: S.STRING,
      allowNull: false,
    },
    admin: {
      type: S.BOOLEAN,
      allowNull: false,
    },
    owner: {
      type: S.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "customer" }
);

module.exports = Customer;
