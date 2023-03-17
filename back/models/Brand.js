const S = require("sequelize");
const db = require("../db/db");

class Brand extends S.Model {}

Brand.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: S.STRING,
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
