const Brand = require("./Brand");
const Carrito = require("./Carrito");
const Customer = require("./Customer");
const Product = require("./Product");
const Order = require("./Order");

Order.belongsTo(Customer);
Customer.hasMany(Order);

Product.belongsTo(Brand);
Brand.hasMany(Product);


module.exports = { Brand, Carrito, Customer, Product };
