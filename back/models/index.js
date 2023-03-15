const Brand = require("./Brand");
const Carrito = require("./Carrito");
const Customer = require("./Customer");
const Product = require("./Product");
const Order = require("./Order");

Order.belongsTo(Customer);
Customer.hasMany(Order);

Product.belongsTo(Brand);
Brand.hasMany(Product);

Product.belongsToMany(Customer, {
  through: {
    model: Carrito,
    unique: false,
    foreignKey: "productId",
    otherKey: "customerId",
  },
});
Customer.belongsToMany(Product, {
  through: {
    model: Carrito,
    unique: false,
    foreignKey: "customerId",
    otherKey: "productId",
  },
});
Carrito.belongsTo(Product, { foreignKey: "productId" });
Carrito.belongsTo(Customer, { foreignKey: "customerId" });

module.exports = { Brand, Carrito, Customer, Product, Order };
