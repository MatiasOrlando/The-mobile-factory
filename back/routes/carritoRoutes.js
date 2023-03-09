const express = require("express");
const { Product, Carrito } = require("../models");
const carritoRouter = express.Router();

carritoRouter.get("/", async (req, res) => {
  console.log("FUNCIONA!!");
  res.send();
  try {
  } catch (error) {
    console.error(error);
  }
});

carritoRouter.post("/", async (req, res) => {
  // req.body { info_producto (cantidad de productos), info_customer }

  const { productId, customerId, productQuantity } = req.body;

  /* 
  SEEDEO!
  const newProduct = await Product.create({id_api: 16, name: "soy el name", price: 18.9, color: "red", display_size_inch: 6.7, info: "soy la info", general_year: 2020, storage_capacity_gb: 64, cpu_number_of_cores: 8, stock: 8})
        
    const newCustomer = await Customer.create({email: "edae@mail.com", password: "1234", full_name: "nombre completo", billing_address: "direccion", default_shipping_address: "direc", country: "pais", phone: "telephone"}) */

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).send("NO EXISTE");

    const [item, created] = await Carrito.findOrCreate({
      where: { customerId: customerId, productId: productId },
      defaults: {
        quantity: productQuantity,
        price: product.price,
        productId: productId,
        customerId: customerId,
      },
    });
    if (!created) {
      const [index, updatedItem] = await Carrito.update(
        { quantity: item.quantity + productQuantity },
        {
          where: { customerId: customerId, productId: productId },
          returning: true,
        }
      );
      return res.send(updatedItem[0]);
    }
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

carritoRouter.delete("/", async (req, res) => {
  // req.body { info_producto, info_customer }
  const { productId, customerId } = req.body;

  try {
    const item = await Carrito.findOne({
      where: { customerId: customerId, productId: productId },
    });
    await Carrito.destroy({ where: { id: item.dataValues.id } });
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

carritoRouter.put("/", async (req, res) => {
  // req.body { info_producto (id, nueva cantidad), info_customer }
  const { productId, customerId, productQuantity } = req.body;

  try {
    const [index, updatedItem] = await Carrito.update(
      { quantity: productQuantity },
      {
        where: { customerId: customerId, productId: productId },
        returning: true,
      }
    );
    updatedItem.length
      ? res.send(updatedItem[0])
      : res.status(404).send("ITEM NOT FOUND");
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = carritoRouter;
