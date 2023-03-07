const Brand = require("./Brand");
const Carrito = require("./Carrito");
const Customer = require("./Customer");
const Product = require("./Product");

Product.belongsToMany(Customer, { through: Carrito });

module.exports = { Brand, Carrito, Customer, Product };
