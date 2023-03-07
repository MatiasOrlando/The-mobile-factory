const S = require("sequelize");
const db = require("../db/db");

class Product extends S.Model {}

Product.init(
  {
    id_api: {
      type: S.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.FLOAT,
      allowNull: false,
    },
    color: {
      type: S.STRING,
      allowNull: false,
    },
    display_size_inch: {
      type: S.FLOAT,
      allowNull: false,
    },
    info: {
      type: S.STRING,
      allowNull: false,
    },
    images: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
    general_year: {
      type: S.INTEGER,
      allowNull: false,
    },
    storage_capacity_gb: {
      type: S.INTEGER,
      allowNull: false,
    },
    cpu_number_of_cores: {
      type: S.INTEGER,
      allowNull: false,
    },
    stock: {
      type: S.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

module.exports = Product;
