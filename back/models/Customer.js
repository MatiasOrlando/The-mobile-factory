const S = require("sequelize");
const db = require("../db/db");
const bcrypt = require("bcrypt");

class Customer extends S.Model {
  async validatePassword(password) {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}

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
    salt: {
      type: S.STRING,
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
      defaultValue: false
    },
    owner: {
      type: S.BOOLEAN,
      defaultValue: false
    },
  },
  { sequelize: db, modelName: "customer" }
);

Customer.addHook("beforeCreate", async (user) => {
  if (!user.password) return;
  try {
    const salt = bcrypt.genSaltSync(9);
    user.salt = salt;
    const hashedPassword = await bcrypt.hash(user.password, user.salt);
    return (user.password = hashedPassword);
  } catch (error) {
    throw new Error("PASSWORD ERROR");
  }
});

module.exports = Customer;
