const express = require("express");
const { Product, Carrito, Customer } = require("../models");
const carritoRouter = express.Router();

carritoRouter.get("/:id", async (req, res) => {
  /* Ruta para obtener todos los productos en el carrito de un usuario */
  /* Id del customer enviado como param */
  const { id } = req.params;
  const customerId = Number(id);

  try {
    const products = await Carrito.findAll({
      where: { customerId },
      include: { model: Product },
    });
    if (!products.length)
      return res.send("No existe ese usuario en la DB/no tiene productos");
    const arrProd = products.map((item) => {
      item.dataValues.product.dataValues.shopQuantity = item.dataValues.quantity;
      return item.dataValues.product.dataValues;
    });
    res.send(arrProd);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

carritoRouter.post("/", async (req, res) => {
  /* Ruta para agregar un producto al carrito de cierto usuario */
  /* Esta ruta también pueden usarla para sumar a la cantidad existente más cantidades, por ejemplo en caso que el usuario clickee varias veces agregar al carrito en el menu principal */
  /* Deben ser INTEGER los datos enviados */
  const { productId, customerId, productQuantity } = req.body;

  if (
    typeof productId !== "number" ||
    typeof customerId !== "number" ||
    typeof productQuantity !== "number"
  )
    return res.status(400).send("Deben ser INTEGER, no STRING");

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).send("No existe ese usuario en la DB");

    const [item, created] = await Carrito.findOrCreate({
      where: { customerId: customerId, productId: productId },
      defaults: {
        quantity: productQuantity,
        price: product.price,
        productId: productId,
        customerId: customerId,
        name: product.name
      },
    });
    if (!created) {
      const [index, updatedItem] = await Carrito.update(
        { quantity: item.quantity + productQuantity },
        {
          where: { customerId: customerId, productId: productId },
          returning: true,
        },
      );
      const product = await Product.findByPk(updatedItem[0].dataValues.productId)
      product.dataValues.shopQuantity = updatedItem[0].dataValues.quantity
      return res.status(201).send(product);
    }
    const newProduct = await Product.findByPk(item.dataValues.productId)
    newProduct.dataValues.shopQuantity = item.dataValues.quantity
    res.status(201).send(newProduct);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

carritoRouter.delete("/", async (req, res) => {
  /* Ruta para eliminar un producto del carrito de cierto usuario */
  /* Los datos enviados deben ser por Query con los id, del producto a eliminar y del usuario */
  /* Para usarlas, se le pega a esta ruta DELETE: "http://localhost:3001/carrito/" y se le agrega "?" con los datos, por ejemplo: "http://localhost:3001/carrito/?productId=2&customerId=1", esto enviaría una variable productId con la string "2", y otra llamada customerId con la string "1" */

  const productId = Number(req.query.productId);
  const customerId = Number(req.query.customerId);

  try {
    const item = await Carrito.findOne({
      where: { customerId: customerId, productId: productId },
    });
    if (!item)
      return res.status(404).send("Relación usuario/producto inexistente");
    await Carrito.destroy({ where: { id: item.dataValues.id } });
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

carritoRouter.put("/", async (req, res) => {
  /* Ruta para editar la cantidad de un producto en el carrito */
  /* La cantidad enviada debe ser la NUEVA cantidad del producto */
  /* Deben ser INTEGER los datos enviados */
  const { productId, customerId, productQuantity } = req.body;

  if (
    typeof productId !== "number" ||
    typeof customerId !== "number" ||
    typeof productQuantity !== "number"
  )
    return res.status(400).send("Deben ser INTEGER, no STRING");

  try {
    const [index, updatedItem] = await Carrito.update(
      { quantity: productQuantity },
      {
        where: { customerId: customerId, productId: productId },
        returning: true,
      }
    );
    if (index) {
      const product = await Product.findByPk(updatedItem[0].dataValues.productId)
      product.dataValues.shopQuantity = updatedItem[0].dataValues.quantity
      return res.status(201).send(product);
    } else {
      return res.status(404).send("Relación usuario/producto inexistente");
    }

  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = carritoRouter;
