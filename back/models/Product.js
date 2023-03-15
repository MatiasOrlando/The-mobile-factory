const S = require("sequelize");
const db = require("../db/db");

class Product extends S.Model {}

Product.init(
  {
    api_id: {
      type: S.INTEGER,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.STRING,
      allowNull: false,
    },
    color: {
      type: S.STRING,
      allowNull: false,
    },
    display_size: {
      type: S.STRING,
      allowNull: false,
    },
    info: {
      type: S.STRING,
    },
    images: {
      type: S.ARRAY(S.STRING),
      set(value) {
        value
          ? this.setDataValue("images", value)
          : this.setDataValue("images", []);
      },
    },
    year: {
      type: S.INTEGER,
      allowNull: false,
    },
    storage: {
      type: S.STRING,
      allowNull: false,
    },
    amountCores: {
      type: S.STRING,
      allowNull: false,
    },
    stock: {
      type: S.INTEGER,
      allowNull: false,
    },
    page: {
      type: S.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

module.exports = Product;
