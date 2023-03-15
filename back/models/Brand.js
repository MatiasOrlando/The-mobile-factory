const S = require("sequelize");
const db = require("../db/db");

class Brand extends S.Model {}

Brand.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    description: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "brand",
  }
);

Brand.addHook("beforeCreate", (brand) => {
  return (brand.name = brand.name.toLowerCase());
});

module.exports = Brand;
